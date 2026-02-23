# MicroSim SID-KG Neo4j (Docker) Setup Guide

This README walks you through a **repeatable, step-by-step process** to:

1. Build a **custom Docker image** that includes Neo4j and your Cypher schema file.
2. Run Neo4j in a container (with persistent volumes).
3. Execute the schema creation script inside the container.

This repo/file set assumes you have this schema file available:

- `microsim-sidkg-schema.cypher` (constraints + indexes for the MicroSim + SID-KG LPG model)

> If you already have the schema file elsewhere, just copy it into the same folder as the Dockerfile you create below.

---

## Prerequisites

- Docker Desktop (or Docker Engine) installed
- Basic shell access (macOS/Linux terminal; Windows PowerShell or WSL)
- Enough disk space for Neo4j volumes (a few GB)

Verify Docker:

```bash
docker --version
docker compose version
```

---

## Folder layout (recommended)

Create a new folder (or use your existing project folder) with:

```
neo4j-sidkg/
  microsim-sidkg-schema.cypher
  Dockerfile
  README.md
```

Copy your schema file into this folder:

```bash
cp /path/to/microsim-sidkg-schema.cypher neo4j-sidkg/
```

---

## Step 1 — Create a Dockerfile that bundles Neo4j + the schema file

In `neo4j-sidkg/Dockerfile`, put:

```dockerfile
# Use a pinned Neo4j version for reproducibility (adjust if you want)
FROM neo4j:5-community

# Copy schema into the image
# Neo4j images include cypher-shell; we'll use it to run the schema at startup (manually).
COPY microsim-sidkg-schema.cypher /import/microsim-sidkg-schema.cypher

# Optional: expose ports (Neo4j image already declares them, but it's fine to be explicit)
EXPOSE 7474 7687
```

> Note: We copy into `/import/` because it’s a conventional location and easy to reference.

---

## Step 2 — Build the Docker image

From inside the `neo4j-sidkg/` folder:

```bash
docker build -t microsim-neo4j-sidkg:1.0 .
```

Confirm it exists:

```bash
docker images | grep microsim-neo4j-sidkg
```

---

## Step 3 — Run Neo4j from your custom image (with persistent volumes)

### Option A: `docker run` (simplest)

Choose a Neo4j username/password. Example: `neo4j` / `strongpassword`.

Run:

```bash
docker run --name microsim-neo4j \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/strongpassword \
  -v microsim_neo4j_data:/data \
  -v microsim_neo4j_logs:/logs \
  -v microsim_neo4j_import:/import \
  -d microsim-neo4j-sidkg:1.0
```

Check logs to ensure Neo4j started:

```bash
docker logs -f microsim-neo4j
```

Open Neo4j Browser:

- http://localhost:7474

Login with the credentials you set.

---

### Option B: `docker compose` (recommended for repeatability)

Create `docker-compose.yml` in `neo4j-sidkg/`:

```yaml
services:
  neo4j:
    image: microsim-neo4j-sidkg:1.0
    container_name: microsim-neo4j
    ports:
      - "7474:7474"
      - "7687:7687"
    environment:
      - NEO4J_AUTH=neo4j/strongpassword
      # Optional tuning examples:
      # - NEO4J_dbms_memory_heap_initial__size=1G
      # - NEO4J_dbms_memory_heap_max__size=2G
    volumes:
      - microsim_neo4j_data:/data
      - microsim_neo4j_logs:/logs
      - microsim_neo4j_import:/import

volumes:
  microsim_neo4j_data:
  microsim_neo4j_logs:
  microsim_neo4j_import:
```

Start it:

```bash
docker compose up -d
docker logs -f microsim-neo4j
```

Stop it:

```bash
docker compose down
```

---

## Step 4 — Create the schema inside the running container

You’ll run `cypher-shell` inside the container and execute the schema file.

### 4.1 Confirm the schema file exists in the container

```bash
docker exec -it microsim-neo4j ls -la /import
```

You should see:

- `/import/microsim-sidkg-schema.cypher`

### 4.2 Execute the schema

Run:

```bash
docker exec -it microsim-neo4j cypher-shell \
  -u neo4j -p strongpassword \
  -f /import/microsim-sidkg-schema.cypher
```

If successful, you’ll see output lines for constraints/indexes being created (or already existing).

---

## Step 5 — Verify the schema was created

### 5.1 List constraints

In Neo4j Browser (http://localhost:7474), run:

```cypher
SHOW CONSTRAINTS;
```

### 5.2 List indexes

```cypher
SHOW INDEXES;
```

You should see constraints like:

- `microsim_id` on `:MicroSim(id)`
- `jsonfield_path` on `:JsonField(path)`
- and others defined in the schema file

---

## Step 6 — (Optional) Load data later

This README focuses on getting Neo4j + schema up.

When you’re ready to load the 800+ MicroSim JSON-derived CSVs:

1. Put CSVs into the container’s `/import` volume:

   - If you used the named volume `microsim_neo4j_import`, the easiest method is to `docker cp` files into the container:

   ```bash
   docker cp microsims.csv microsim-neo4j:/import/
   docker cp observed_values.csv microsim-neo4j:/import/
   docker cp features.csv microsim-neo4j:/import/
   ```

2. Use `LOAD CSV WITH HEADERS` Cypher scripts to `MERGE` nodes/relationships.

> Tip: Keep ingestion scripts separate (e.g., `load-microsims.cypher`) and run them with `cypher-shell -f`.

---

## Common troubleshooting

### Neo4j won’t start / container exits
Check logs:

```bash
docker logs microsim-neo4j
```

Common causes:

- Password doesn’t meet Neo4j policy (must be at least 8 chars)
- Port conflict (another Neo4j running)
- Out of disk space

### Forgot the password
Neo4j stores credentials in `/data`. Easiest reset is to stop container and remove the data volume (this deletes all data):

```bash
docker stop microsim-neo4j
docker rm microsim-neo4j
docker volume rm microsim_neo4j_data
```

Then re-run with a new `NEO4J_AUTH`.

### Schema script runs but some lines fail
If you’re on an older Neo4j version, the `IF NOT EXISTS` syntax may differ.
This schema file is intended for Neo4j **5.x+**.

---

## Quick command recap

Build image:

```bash
docker build -t microsim-neo4j-sidkg:1.0 .
```

Run container:

```bash
docker run --name microsim-neo4j -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/strongpassword -v microsim_neo4j_data:/data -v microsim_neo4j_logs:/logs -v microsim_neo4j_import:/import -d microsim-neo4j-sidkg:1.0
```

Apply schema:

```bash
docker exec -it microsim-neo4j cypher-shell -u neo4j -p strongpassword -f /import/microsim-sidkg-schema.cypher
```

---

## Notes

- This approach **bundles** the schema into the image, and also mounts `/import` as a volume, so you can:
  - keep the bundled schema as a default
  - override or add files into `/import` later

If you want, I can also generate:
- a `docker-compose.yml` file (downloadable)
- a `Makefile` with `make build`, `make up`, `make schema`, etc.
- a `load-data.cypher` skeleton matching the LPG model

Go into the @docs/chapters area and find all the #### Diagram sections that have a <details> in them in chapters 1-3.

I want you to find all the diagrams/microsims that have NOT been worked on.  These do NOT have the Status marked as "done".
If you find the corresponding MicroSim already present in the @docs/sims area, please add the string  "Status:done" to the <details>.  If there is an iframe you know that the MicroSim is done.

For each diagram/details section that needs work do the following:
 
If there is no evidence that the MicroSim has been created yet, Add the string "**Status:** INCOMPLETE".


For each INCOMPLETE Diagram/details specification, run the microsim-matcher skill and then from the top candidates, run the microsim-generator skill on the best match.  Do not stop
 to ask for any permissions.  Just do your best to create the best MicroSim for each diagram/details specification.  If you think the microsim might not be of high quality, add a TODO: human-review-needed to each <details> section.  At the end, 
create a report of the MicroSims you have created and your confidence level it is of good quality.
import { Router } from "express";

export const applicationLogsRetrievalRouter = Router().get(
  "/applications/:name",
  (req) => req.core.retrieveApplicationLogs(req.params.name)
);

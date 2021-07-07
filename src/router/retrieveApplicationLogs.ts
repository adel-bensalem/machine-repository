import { Router } from "express";

export const applicationLogsRetrievalRouter = Router().get(
  "/applications/:name/logs",
  (req) => req.core.retrieveApplicationLogs(req.params.name)
);

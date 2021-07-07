import { Router } from "express";

export const applicationLogsRetrievalRouter = Router().get(
  "/users/:userId/applications/:name/logs",
  (req) => req.core.retrieveApplicationLogs(req.params.userId, req.params.name)
);

import { Router } from "express";

export const applicationsRetrievalRouter = Router().get(
  "/users/:userId/applications",
  (req) =>
    req.core.retrieveApplications(req.params.userId, {
      start:
        typeof req.query.start === "number" ? parseInt(req.query.start) : 0,
      limit:
        typeof req.query.start === "number" ? parseInt(req.query.start) : 999,
    })
);

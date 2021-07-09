import { Router } from "express";

export const applicationRollbackRouter = Router().put(
  "/users/:userId/applications/:name/deployments/:tag",
  (req) =>
    req.core.rollbackApplication(
      req.params.userId,
      req.params.name,
      req.params.tag
    )
);

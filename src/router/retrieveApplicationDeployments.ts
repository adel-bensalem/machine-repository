import { Router } from "express";

export const applicationDeploymentsRetrievalRouter = Router().get(
  "/users/:userId/applications/:name/deployments",
  (req) =>
    req.core.retrieveApplicationDeployments(req.params.userId, req.params.name)
);

import { Router } from "express";

export const deploymentCreationRouter = Router().post(
  "/applications/:applicationName/deployments",
  (req) => {
    req.core.createDeployment(req.params.applicationName);
  }
);

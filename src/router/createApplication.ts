import { Router } from "express";

export const applicationCreationRouter = Router().post(
  "/applications",
  (req) => {
    const data = req.body || {};

    req.core.createApplication(data.application, data.user);
  }
);

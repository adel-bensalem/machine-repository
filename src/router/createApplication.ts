import { Router } from "express";

export const applicationCreationRouter = Router().post("/applications", (req) =>
  req.core.createApplication(req.body)
);

import { Router } from "express";

export const registrationRouter = Router().post("/users", (req) =>
  req.core.register(req.body)
);

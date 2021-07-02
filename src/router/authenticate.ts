import { Router } from "express";
import { Credentials } from "@types";

export const authenticationRouter = Router().get("/users", (req) =>
  req.core.authenticate(req.query as Credentials)
);

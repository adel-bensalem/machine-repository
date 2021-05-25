import { Router } from "express";
import { applicationCreationRouter } from "./createApplication";

const router = Router();

router.use(applicationCreationRouter);

export { router };

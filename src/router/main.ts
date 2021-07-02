import { Router } from "express";
import { applicationCreationRouter } from "./createApplication";
import { registrationRouter } from "./register";

const router = Router();

router.use(applicationCreationRouter);
router.use(registrationRouter);

export { router };

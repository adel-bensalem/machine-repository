import { Router } from "express";
import { applicationCreationRouter } from "./createApplication";
import { registrationRouter } from "./register";
import { authenticationRouter } from "./authenticate";

const router = Router();

router.use(applicationCreationRouter);
router.use(registrationRouter);
router.use(authenticationRouter);

export { router };

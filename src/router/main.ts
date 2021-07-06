import { Router } from "express";
import { applicationCreationRouter } from "./createApplication";
import { registrationRouter } from "./register";
import { authenticationRouter } from "./authenticate";
import { applicationsRetrievalRouter } from "./retrieveApplications";

const router = Router();

router.use(applicationCreationRouter);
router.use(registrationRouter);
router.use(authenticationRouter);
router.use(applicationsRetrievalRouter);

export { router };

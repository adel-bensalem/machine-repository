import { Router } from "express";
import { applicationCreationRouter } from "./createApplication";
import { registrationRouter } from "./register";
import { authenticationRouter } from "./authenticate";
import { applicationsRetrievalRouter } from "./retrieveApplications";
import { applicationLogsRetrievalRouter } from "./retrieveApplicationLogs";
import { deploymentCreationRouter } from "./createDeployment";
import { applicationDeploymentsRetrievalRouter } from "./retrieveApplicationDeployments";

const router = Router();

router.use(applicationCreationRouter);
router.use(registrationRouter);
router.use(authenticationRouter);
router.use(applicationsRetrievalRouter);
router.use(applicationLogsRetrievalRouter);
router.use(deploymentCreationRouter);
router.use(applicationDeploymentsRetrievalRouter);

export { router };

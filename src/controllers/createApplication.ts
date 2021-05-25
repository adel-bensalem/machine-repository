import { Core, Presenter } from "@core";
import { ApplicationCreationInteractor } from "../core/useCases/createApplication";
import { validateApplication } from "./validators/applicationValidator";

const createApplicationCreationController =
  (core: Core, presenter: Presenter): ApplicationCreationInteractor =>
  (application) =>
    validateApplication(application)
      ? core.createApplication(application)
      : presenter.presentApplicationCreationFailure(
          {
            isApplicationInvalid: true,
            doesApplicationExists: false,
            hasUnExpectedError: false,
          },
          application
        );

export { createApplicationCreationController };

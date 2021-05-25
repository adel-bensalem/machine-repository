import { Application, ApplicationCreationError } from "@types";

interface ApplicationCreationPresenter {
  presentApplicationCreationSuccess(application: Application): void;
  presentApplicationCreationFailure(
    error: ApplicationCreationError,
    application: Application
  ): void;
}

export { ApplicationCreationPresenter };

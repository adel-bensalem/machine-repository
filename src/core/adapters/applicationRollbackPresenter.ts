import { ApplicationRollbackError, Deployment, Identifiable } from "@types";

interface ApplicationRollbackPresenter {
  presentApplicationRollbackSuccess(deployment: Identifiable<Deployment>): void;
  presentApplicationRollbackFailure(error: ApplicationRollbackError): void;
}

export { ApplicationRollbackPresenter };

import { Application, ApplicationsRetrievalError, Identifiable } from "@types";

interface ApplicationsRetrievalPresenter {
  presentApplicationsRetrievalSuccess(
    applications: Identifiable<Application>[]
  ): void;
  presentApplicationsRetrievalFailure(error: ApplicationsRetrievalError): void;
}

export { ApplicationsRetrievalPresenter };

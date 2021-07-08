import {
  ApplicationDeploymentsRetrievalError,
  Deployment,
  Identifiable,
} from "@types";

interface ApplicationDeploymentsRetrievalPresenter {
  presentApplicationDeploymentsRetrievalSuccess(
    deployment: Identifiable<Deployment>[]
  ): void;
  presentApplicationDeploymentsRetrievalFailure(
    error: ApplicationDeploymentsRetrievalError
  ): void;
}

export { ApplicationDeploymentsRetrievalPresenter };

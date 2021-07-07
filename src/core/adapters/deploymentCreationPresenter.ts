import { Deployment, DeploymentCreationError, Identifiable } from "@types";

interface DeploymentCreationPresenter {
  presentDeploymentCreationSuccess(deployment: Identifiable<Deployment>): void;
  presentDeploymentCreationFailure(error: DeploymentCreationError): void;
}

export { DeploymentCreationPresenter };

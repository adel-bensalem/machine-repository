import { Application, Deployment, Identifiable } from "@types";

interface DeploymentLog {
  tagDeployment(
    application: Identifiable<Application>
  ): Promise<Identifiable<Deployment>>;
  retrieveDeployments(
    application: Identifiable<Application>
  ): Promise<Identifiable<Deployment>[]>;
  retrieveDeployment(tag: string): Promise<Identifiable<Deployment>>;
}

export { DeploymentLog };

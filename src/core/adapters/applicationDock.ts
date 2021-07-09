import { Application, Deployment, Identifiable } from "@types";

interface ApplicationDock {
  isApplicationRunning(application: Identifiable<Application>): Promise<void>;
  deployApplicationAtTag(
    application: Identifiable<Application>,
    deployment: Identifiable<Deployment>
  ): Promise<void>;
}

export { ApplicationDock };

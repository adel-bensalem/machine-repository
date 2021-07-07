import { Application, Identifiable } from "@types";

interface ApplicationDock {
  isApplicationRunning(application: Identifiable<Application>): Promise<void>;
}

export { ApplicationDock };

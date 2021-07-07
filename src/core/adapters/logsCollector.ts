import { Application, Identifiable } from "@types";

interface LogsCollector {
  collectLogs(application: Identifiable<Application>): Promise<string[]>;
}

export { LogsCollector };

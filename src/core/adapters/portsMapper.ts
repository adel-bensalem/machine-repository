import { Application } from "@types";

interface PortsMapper {
  mapApplications(applications: Application[]): Promise<void>;
}

export { PortsMapper };

import { Application } from "@types";

interface ApplicationRepository {
  findApplication(application: Application): Promise<Application | null>;
  saveApplication(application: Application): Promise<Application>;
  getApplications(): Promise<Application[]>;
}

export { ApplicationRepository };

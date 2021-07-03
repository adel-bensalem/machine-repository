import { Application, Identifiable, User } from "@types";

interface ApplicationRepository {
  findApplication(application: Application): Promise<Application | null>;
  saveApplication(
    application: Application,
    user: Identifiable<User>
  ): Promise<Application>;
  getApplications(): Promise<Application[]>;
}

export { ApplicationRepository };

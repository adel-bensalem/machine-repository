import {
  Application,
  ApplicationsRetrievalFilter,
  Id,
  Identifiable,
  User,
} from "@types";

interface ApplicationRepository {
  findApplication(application: Application): Promise<Application | null>;
  saveApplication(
    application: Application,
    user: Identifiable<User>
  ): Promise<Application>;
  getApplications(): Promise<Application[]>;
  getUserApplications(
    userId: Id,
    filter: ApplicationsRetrievalFilter
  ): Promise<Identifiable<Application>[]>;
}

export { ApplicationRepository };

import {
  Application,
  ApplicationsRetrievalFilter,
  Id,
  Identifiable,
} from "@types";
import axios from "axios";

const iamUrl = process.env.IAM_SERVICE_URL;

const getUserApplications =
  () => (userId: Id, filter: ApplicationsRetrievalFilter) =>
    new Promise<Identifiable<Application>[]>((resolve, reject) =>
      axios
        .get(
          `${iamUrl}/users/${userId}/resources?start=${filter.start}&limit=${filter.limit}&name=application&permission[canRead]=true`
        )
        .then(({ data: applications }) =>
          applications.map((application: Identifiable<Application>) => ({
            ...application,
            name: application.name.replace("application.", ""),
          }))
        )
        .then(resolve)
        .catch((error) =>
          reject(
            !!error.response
              ? error.response.data
              : !!error.request
              ? error.request
              : error
          )
        )
    );

export { getUserApplications };

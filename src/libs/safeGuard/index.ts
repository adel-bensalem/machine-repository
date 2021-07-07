import { SafeGuard } from "@core";
import axios from "axios";

const iamUrl = process.env.IAM_SERVICE_URL;

const createSafeGuard = (): SafeGuard => ({
  ensureUserPermission: (userId, application) =>
    new Promise((resolve, reject) =>
      axios
        .get(
          `${iamUrl}/users/${userId}/resources/application.${application.name}/permissions?intent=read`
        )
        .then(() => resolve())
        .catch((error) =>
          reject(
            !!error.response
              ? error.response.data
              : !!error.request
              ? error.request
              : error
          )
        )
    ),
});

export { createSafeGuard };

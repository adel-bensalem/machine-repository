import { Credentials, User } from "@types";
import axios from "axios";

const iamUrl = process.env.IAM_SERVICE_URL;

const saveAccount =
  () =>
  ({ email: name, password }: Credentials) =>
    new Promise<User>((resolve, reject) =>
      axios
        .post(`${iamUrl}/users`, { name, password })
        .then(({ data: { name, ...data } }) =>
          resolve({ ...data, email: name })
        )
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

export { saveAccount };

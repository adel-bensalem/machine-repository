import { Credentials, Identifiable, User } from "@types";
import axios from "axios";

const iamUrl = process.env.IAM_SERVICE_URL;

const findUser =
  () =>
  ({ email: name, password }: Credentials) =>
    new Promise<Identifiable<User>>((resolve, reject) =>
      axios
        .get(`${iamUrl}/users`, { params: { name, password } })
        .then(({ data }) =>
          axios.get(`${iamUrl}/users`, {
            headers: { Authorization: `Bearer ${data.token}` },
          })
        )
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

export { findUser };

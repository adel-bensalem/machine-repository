import { Credentials } from "@types";
import { validate } from "jsonschema";

const schema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
};

const validateCredentials = (credentials: Credentials): boolean =>
  validate(credentials, schema).valid;

export { validateCredentials };

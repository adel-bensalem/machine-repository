import { User } from "@types";
import { validate } from "jsonschema";

const schema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: { type: "string" },
    },
    password: {
      type: { type: "string" },
    },
  },
};

const validateUser = (user: User): boolean => validate(user, schema).valid;

export { validateUser };

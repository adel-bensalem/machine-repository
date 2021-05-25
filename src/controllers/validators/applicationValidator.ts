import { Application } from "@types";
import { validate } from "jsonschema";

const schema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
  },
};

const validateApplication = (application: Application): boolean =>
  validate(application, schema).valid;

export { validateApplication };

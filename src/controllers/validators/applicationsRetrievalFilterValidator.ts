import { ApplicationsRetrievalFilter } from "@types";
import { validate } from "jsonschema";

const schema = {
  type: "object",
  required: ["start", "limit"],
  properties: {
    start: { type: "number" },
    limit: { type: "number" },
  },
};

const validateApplicationsRetrievalFilter = (
  filter: ApplicationsRetrievalFilter
): boolean => validate(filter, schema).valid;

export { validateApplicationsRetrievalFilter };

import { Application } from "@types";

const isApplicationValid = (application: Application): boolean =>
  application.name.length > 0;

export { isApplicationValid };

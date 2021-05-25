import { Core } from "@core";

declare global {
  declare namespace Express {
    export interface Request {
      core: Core;
    }
  }
}

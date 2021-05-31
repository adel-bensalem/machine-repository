import { Core, Presenter } from "@core";
import { createApplicationCreationController } from "./createApplication";

const createController = (core: Core, presenter: Presenter): Core => ({
  createApplication: createApplicationCreationController(core, presenter),
  startApplications: core.startApplications,
});

export { createController };

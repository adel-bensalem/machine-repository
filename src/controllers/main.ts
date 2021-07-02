import { Core, Presenter } from "@core";
import { createApplicationCreationController } from "./createApplication";
import { createRegistrationController } from "./register";

const createController = (core: Core, presenter: Presenter): Core => ({
  createApplication: createApplicationCreationController(core, presenter),
  register: createRegistrationController(core, presenter),
  startApplications: core.startApplications,
});

export { createController };

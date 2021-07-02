import { Core, Presenter } from "@core";
import { User } from "@types";
import { validateUser } from "./validators/userValidator";

const createRegistrationController =
  (core: Core, presenter: Presenter) => (user: User) =>
    validateUser(user)
      ? core.register(user)
      : presenter.presentRegistrationFailure(
          {
            doesUserAlreadyExists: false,
            hasInvalidEmail: false,
            hasInvalidPassword: false,
            wasPermissionDenied: true,
          },
          user
        );

export { createRegistrationController };

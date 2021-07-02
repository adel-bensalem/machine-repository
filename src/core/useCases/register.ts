import { User } from "@types";
import { RegistrationPresenter } from "../adapters/registrationPresenter";
import { UserRepository } from "../adapters/userRepository";
import { validateUser } from "../entities/userValidator";
import { findError } from "../entities/errorChecker";

type RegistrationInteractor = (user: User) => void;

const createRegistrationInteractor =
  (
    repository: UserRepository,
    presenter: RegistrationPresenter
  ): RegistrationInteractor =>
  (user) => {
    const error = validateUser(user);

    !findError(error)
      ? repository
          .saveAccount(user)
          .then(presenter.presentRegistrationSuccess)
          .catch((e) =>
            presenter.presentRegistrationFailure({ ...error, ...e }, user)
          )
      : presenter.presentRegistrationFailure(
          {
            ...error,
            wasPermissionDenied: false,
            doesUserAlreadyExists: false,
          },
          user
        );
  };

export { createRegistrationInteractor, RegistrationInteractor };

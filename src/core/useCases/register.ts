import { User } from "@types";
import { RegistrationPresenter } from "../adapters/registrationPresenter";
import { UserRepository } from "../adapters/userRepository";
import { KeysVault } from "../adapters/keysVault";
import { validateUser } from "../entities/userValidator";
import { findError } from "../entities/errorChecker";

type RegistrationInteractor = (user: User) => void;

const createRegistrationInteractor =
  (
    repository: UserRepository,
    keysVault: KeysVault,
    presenter: RegistrationPresenter
  ): RegistrationInteractor =>
  (user) => {
    const error = validateUser(user);

    !findError(error)
      ? repository
          .saveAccount(user)
          .then((user) =>
            keysVault.createKey(user).then((key) => ({ user, key }))
          )
          .then(({ user, key }) =>
            presenter.presentRegistrationSuccess(user, key)
          )
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

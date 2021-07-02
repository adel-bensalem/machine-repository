import { Credentials } from "../../types/credentials";
import { KeysVault } from "../adapters/keysVault";
import { UserRepository } from "../adapters/userRepository";
import { AuthenticationPresenter } from "../adapters/authenticationPresenter";

type AuthenticationInteractor = (credentials: Credentials) => void;

const createAuthenticationInteractor =
  (
    repository: UserRepository,
    keysVault: KeysVault,
    presenter: AuthenticationPresenter
  ): AuthenticationInteractor =>
  (credentials) =>
    repository
      .findUser(credentials)
      .then(keysVault.retrieveKey)
      .then(presenter.presentAuthenticationSuccess)
      .catch((error) =>
        presenter.presentAuthenticationFailure({
          areCredentialsInvalid: false,
          hasUnExpectedError: false,
          wasAccountNotFound: false,
          ...error,
        })
      );

export { createAuthenticationInteractor, AuthenticationInteractor };

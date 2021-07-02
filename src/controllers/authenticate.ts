import { Core, Presenter } from "@core";
import { AuthenticationInteractor } from "../core/useCases/authenticate";
import { validateCredentials } from "./validators/credentialsValidator";

const createAuthenticationController =
  (core: Core, presenter: Presenter): AuthenticationInteractor =>
  (credentials) =>
    validateCredentials(credentials)
      ? core.authenticate(credentials)
      : presenter.presentAuthenticationFailure({
          areCredentialsInvalid: true,
          wasAccountNotFound: false,
          hasUnExpectedError: false,
        });

export { createAuthenticationController };

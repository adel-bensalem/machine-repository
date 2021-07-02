import { AuthenticationError } from "@types";

interface AuthenticationPresenter {
  presentAuthenticationSuccess(key: string): void;
  presentAuthenticationFailure(error: AuthenticationError): void;
}

export { AuthenticationPresenter };

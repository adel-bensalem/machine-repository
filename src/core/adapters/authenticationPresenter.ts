import { AuthenticationError, Identifiable, User } from "@types";

interface AuthenticationPresenter {
  presentAuthenticationSuccess(key: string, user: Identifiable<User>): void;
  presentAuthenticationFailure(error: AuthenticationError): void;
}

export { AuthenticationPresenter };

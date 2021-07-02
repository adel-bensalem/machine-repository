import { User } from "../../types/user";
import { RegistrationError } from "../../types/registrationError";

interface RegistrationPresenter {
  presentRegistrationSuccess(user: User, key: string): void;
  presentRegistrationFailure(error: RegistrationError, user: User): void;
}

export { RegistrationPresenter };

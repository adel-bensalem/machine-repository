import { User } from "../../types/user";
import { RegistrationError } from "../../types/registrationError";

interface RegistrationPresenter {
  presentRegistrationSuccess(user: User): void;
  presentRegistrationFailure(error: RegistrationError, user: User): void;
}

export { RegistrationPresenter };

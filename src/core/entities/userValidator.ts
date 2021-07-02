import { User } from "@types";
import { isEmailValid } from "./emailValidator";

function validateUser({ email, password }: User): {
  hasInvalidEmail: boolean;
  hasInvalidPassword: boolean;
} {
  return {
    hasInvalidEmail: !isEmailValid(email),
    hasInvalidPassword: !password,
  };
}

export { validateUser };

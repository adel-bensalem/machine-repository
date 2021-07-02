type RegistrationError = {
  wasPermissionDenied: boolean;
  doesUserAlreadyExists: boolean;
  hasInvalidEmail: boolean;
  hasInvalidPassword: boolean;
};

export { RegistrationError };

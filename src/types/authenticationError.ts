type AuthenticationError = {
  wasAccountNotFound: boolean;
  areCredentialsInvalid: boolean;
  hasUnExpectedError: boolean;
};

export { AuthenticationError };

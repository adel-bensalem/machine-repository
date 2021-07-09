type ApplicationRollbackError = {
  wasApplicationNotFound: boolean;
  wasTagNotFound: boolean;
  wasPermissionDenied: boolean;
};

export { ApplicationRollbackError };

type ApplicationLogsRetrievalError = {
  wasApplicationNotFound: boolean;
  isApplicationNotRunning: boolean;
  wasPermissionDenied: boolean;
};

export { ApplicationLogsRetrievalError };

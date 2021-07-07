import { ApplicationLogsRetrievalError } from "@types";

interface ApplicationLogsRetrievalPresenter {
  presentApplicationLogsRetrievalSuccess(logs: string[]): void;
  presentApplicationLogsRetrievalFailure(
    error: ApplicationLogsRetrievalError,
    applicationName: string
  ): void;
}

export { ApplicationLogsRetrievalPresenter };

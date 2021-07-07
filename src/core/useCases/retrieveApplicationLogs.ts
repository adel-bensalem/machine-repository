import { Id } from "@types";
import { LogsCollector } from "../adapters/logsCollector";
import { ApplicationRepository } from "../adapters/applicationRepository";
import { ApplicationLogsRetrievalPresenter } from "../adapters/applicationLogsRetrievalPresenter";
import { ApplicationDock } from "../adapters/applicationDock";
import { SafeGuard } from "../adapters/safeGuard";

type ApplicationLogsRetrievalInteractor = (
  userId: Id,
  applicationName: string
) => void;

const createApplicationLogsRetrievalInteractor =
  (
    logsCollector: LogsCollector,
    applicationDock: ApplicationDock,
    safeGuard: SafeGuard,
    repository: ApplicationRepository,
    presenter: ApplicationLogsRetrievalPresenter
  ): ApplicationLogsRetrievalInteractor =>
  (userId, applicationName) =>
    repository
      .findApplication({ name: applicationName })
      .then((application) =>
        application
          ? safeGuard
              .ensureUserPermission(userId, application)
              .then(() =>
                applicationDock
                  .isApplicationRunning(application)
                  .then(() =>
                    logsCollector
                      .collectLogs(application)
                      .then(presenter.presentApplicationLogsRetrievalSuccess)
                      .catch(() =>
                        presenter.presentApplicationLogsRetrievalFailure(
                          {
                            wasApplicationNotFound: false,
                            isApplicationNotRunning: false,
                            wasPermissionDenied: false,
                          },
                          applicationName
                        )
                      )
                  )
                  .catch(() =>
                    presenter.presentApplicationLogsRetrievalFailure(
                      {
                        isApplicationNotRunning: true,
                        wasApplicationNotFound: false,
                        wasPermissionDenied: false,
                      },
                      applicationName
                    )
                  )
              )
              .catch(() => {
                presenter.presentApplicationLogsRetrievalFailure(
                  {
                    wasPermissionDenied: true,
                    isApplicationNotRunning: false,
                    wasApplicationNotFound: false,
                  },
                  applicationName
                );
              })
          : presenter.presentApplicationLogsRetrievalFailure(
              {
                wasApplicationNotFound: true,
                isApplicationNotRunning: false,
                wasPermissionDenied: false,
              },
              applicationName
            )
      )
      .catch(() =>
        presenter.presentApplicationLogsRetrievalFailure(
          {
            wasApplicationNotFound: true,
            isApplicationNotRunning: false,
            wasPermissionDenied: false,
          },
          applicationName
        )
      );

export {
  createApplicationLogsRetrievalInteractor,
  ApplicationLogsRetrievalInteractor,
};

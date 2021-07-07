import { LogsCollector } from "../adapters/logsCollector";
import { ApplicationRepository } from "../adapters/applicationRepository";
import { ApplicationLogsRetrievalPresenter } from "../adapters/applicationLogsRetrievalPresenter";
import { ApplicationDock } from "../adapters/applicationDock";

type ApplicationLogsRetrievalInteractor = (applicationName: string) => void;

const createApplicationLogsRetrievalInteractor =
  (
    logsCollector: LogsCollector,
    applicationDock: ApplicationDock,
    repository: ApplicationRepository,
    presenter: ApplicationLogsRetrievalPresenter
  ): ApplicationLogsRetrievalInteractor =>
  (applicationName) =>
    repository
      .findApplication({ name: applicationName })
      .then((application) =>
        application
          ? applicationDock
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
                  },
                  applicationName
                )
              )
          : presenter.presentApplicationLogsRetrievalFailure(
              { wasApplicationNotFound: true, isApplicationNotRunning: false },
              applicationName
            )
      )
      .catch(() =>
        presenter.presentApplicationLogsRetrievalFailure(
          { wasApplicationNotFound: true, isApplicationNotRunning: false },
          applicationName
        )
      );

export {
  createApplicationLogsRetrievalInteractor,
  ApplicationLogsRetrievalInteractor,
};

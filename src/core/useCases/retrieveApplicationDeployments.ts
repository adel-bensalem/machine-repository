import { Id } from "@types";
import { ApplicationRepository } from "../adapters/applicationRepository";
import { ApplicationDeploymentsRetrievalPresenter } from "../adapters/applicationDeploymentsRetrievalPresenter";
import { SafeGuard } from "../adapters/safeGuard";
import { DeploymentLog } from "@core";

type ApplicationDeploymentsRetrievalInteractor = (
  userId: Id,
  applicationName: string
) => void;

const createApplicationDeploymentsRetrievalInteractor =
  (
    log: DeploymentLog,
    safeGuard: SafeGuard,
    repository: ApplicationRepository,
    presenter: ApplicationDeploymentsRetrievalPresenter
  ): ApplicationDeploymentsRetrievalInteractor =>
  (userId, applicationName) =>
    repository
      .findApplication({ name: applicationName })
      .then((application) =>
        application
          ? safeGuard
              .ensureUserPermission(userId, application)
              .then(() =>
                log
                  .retrieveDeployments(application)
                  .then(presenter.presentApplicationDeploymentsRetrievalSuccess)
                  .catch(() =>
                    presenter.presentApplicationDeploymentsRetrievalFailure({
                      wasApplicationNotFound: false,
                      wasPermissionDenied: false,
                    })
                  )
              )
              .catch(() => {
                presenter.presentApplicationDeploymentsRetrievalFailure({
                  wasPermissionDenied: true,
                  wasApplicationNotFound: false,
                });
              })
          : presenter.presentApplicationDeploymentsRetrievalFailure({
              wasApplicationNotFound: true,
              wasPermissionDenied: false,
            })
      )
      .catch(() =>
        presenter.presentApplicationDeploymentsRetrievalFailure({
          wasApplicationNotFound: true,
          wasPermissionDenied: false,
        })
      );

export {
  createApplicationDeploymentsRetrievalInteractor,
  ApplicationDeploymentsRetrievalInteractor,
};

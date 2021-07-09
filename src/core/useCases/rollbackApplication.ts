import { Id } from "@types";
import {
  ApplicationDock,
  ApplicationRepository,
  DeploymentLog,
  SafeGuard,
} from "@core";
import { ApplicationRollbackPresenter } from "../adapters/applicationRollbackPresenter";

type ApplicationRollbackInteractor = (
  userId: Id,
  applicationName: string,
  tag: string
) => void;

const createApplicationRollbackInteractor =
  (
    safeGuard: SafeGuard,
    repository: ApplicationRepository,
    log: DeploymentLog,
    dock: ApplicationDock,
    presenter: ApplicationRollbackPresenter
  ): ApplicationRollbackInteractor =>
  (userId, applicationName, tag) =>
    repository
      .findApplication({ name: applicationName })
      .then((application) =>
        application
          ? log
              .retrieveDeployment(tag)
              .then((deployment) =>
                dock
                  .deployApplicationAtTag(application, deployment)
                  .then(() =>
                    presenter.presentApplicationRollbackSuccess(deployment)
                  )
                  .catch(() =>
                    presenter.presentApplicationRollbackFailure({
                      wasApplicationNotFound: false,
                      wasPermissionDenied: false,
                      wasTagNotFound: false,
                    })
                  )
              )
              .catch(() =>
                presenter.presentApplicationRollbackFailure({
                  wasApplicationNotFound: false,
                  wasPermissionDenied: false,
                  wasTagNotFound: true,
                })
              )
          : presenter.presentApplicationRollbackFailure({
              wasApplicationNotFound: true,
              wasTagNotFound: false,
              wasPermissionDenied: false,
            })
      )
      .catch(() =>
        presenter.presentApplicationRollbackFailure({
          wasApplicationNotFound: true,
          wasTagNotFound: false,
          wasPermissionDenied: false,
        })
      );

export { createApplicationRollbackInteractor, ApplicationRollbackInteractor };

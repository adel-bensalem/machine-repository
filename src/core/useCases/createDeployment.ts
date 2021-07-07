import { ApplicationRepository } from "@core";
import { DeploymentCreationPresenter } from "../adapters/deploymentCreationPresenter";
import { DeploymentLog } from "../adapters/deploymentLog";

type DeploymentCreationInteractor = (applicationName: string) => void;

const createDeploymentCreationInteractor =
  (
    repository: ApplicationRepository,
    log: DeploymentLog,
    presenter: DeploymentCreationPresenter
  ): DeploymentCreationInteractor =>
  (name) =>
    repository
      .findApplication({ name })
      .then((application) =>
        application
          ? log
              .tagDeployment(application)
              .then(presenter.presentDeploymentCreationSuccess)
              .catch(() =>
                presenter.presentDeploymentCreationFailure({
                  wasApplicationNotFound: false,
                })
              )
          : presenter.presentDeploymentCreationFailure({
              wasApplicationNotFound: true,
            })
      )
      .catch(() =>
        presenter.presentDeploymentCreationFailure({
          wasApplicationNotFound: true,
        })
      );

export { createDeploymentCreationInteractor, DeploymentCreationInteractor };

import {
  Application,
  ApplicationCreationError,
  Identifiable,
  User,
} from "@types";
import { ApplicationRepository } from "../adapters/applicationRepository";
import { ApplicationCreationPresenter } from "../adapters/applicationCreationPresenter";
import { isApplicationValid } from "../entities/applicationValidator";
import { findError } from "../entities/errorChecker";

type ApplicationCreationInteractor = (
  application: Application,
  user: Identifiable<User>
) => void;

const createApplicationCreationInteractor =
  (
    repository: ApplicationRepository,
    presenter: ApplicationCreationPresenter
  ): ApplicationCreationInteractor =>
  (application, user) => {
    const error: ApplicationCreationError = {
      doesApplicationExists: false,
      hasUnExpectedError: false,
      isApplicationInvalid: !isApplicationValid(application),
    };

    !findError(error)
      ? repository
          .findApplication(application)
          .then((app) =>
            !app
              ? repository
                  .saveApplication(application, user)
                  .then(() =>
                    presenter.presentApplicationCreationSuccess(application)
                  )
                  .catch(() =>
                    presenter.presentApplicationCreationFailure(
                      { ...error, hasUnExpectedError: true },
                      application
                    )
                  )
              : presenter.presentApplicationCreationFailure(
                  { ...error, doesApplicationExists: true },
                  application
                )
          )
          .catch(() =>
            presenter.presentApplicationCreationFailure(
              { ...error, hasUnExpectedError: true },
              application
            )
          )
      : presenter.presentApplicationCreationFailure(error, application);
  };

export { createApplicationCreationInteractor, ApplicationCreationInteractor };

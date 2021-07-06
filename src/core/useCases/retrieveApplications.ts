import { ApplicationsRetrievalFilter, Id } from "@types";
import { ApplicationRepository } from "@core";
import { ApplicationsRetrievalPresenter } from "../adapters/applicationsRetrievalPresenter";

type ApplicationsRetrievalInteractor = (
  userId: Id,
  filter: ApplicationsRetrievalFilter
) => void;

const createApplicationsRetrievalInteractor =
  (
    repository: ApplicationRepository,
    presenter: ApplicationsRetrievalPresenter
  ): ApplicationsRetrievalInteractor =>
  (userId, filter) =>
    repository
      .getUserApplications(userId, filter)
      .then(presenter.presentApplicationsRetrievalSuccess)
      .catch(presenter.presentApplicationsRetrievalFailure);

export {
  createApplicationsRetrievalInteractor,
  ApplicationsRetrievalInteractor,
};

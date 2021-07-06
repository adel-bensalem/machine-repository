import { Core, Presenter } from "@core";
import { ApplicationsRetrievalFilter, Id } from "@types";
import { validateApplicationsRetrievalFilter } from "./validators/applicationsRetrievalFilterValidator";

const createApplicationsRetrievalController =
  (core: Core, presenter: Presenter) =>
  (userId: Id, filter: ApplicationsRetrievalFilter) => {
    validateApplicationsRetrievalFilter(filter)
      ? core.retrieveApplications(userId, filter)
      : presenter.presentApplicationsRetrievalFailure({
          wasUserNotFound: false,
          hasUnExpectedError: false,
        });
  };

export { createApplicationsRetrievalController };

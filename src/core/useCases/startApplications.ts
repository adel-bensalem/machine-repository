import { ApplicationRepository } from "@core";
import { PortsMapper } from "../adapters/portsMapper";
import { ApplicationsStartPresenter } from "../adapters/applicationsStartPresenter";

type ApplicationsStartInteractor = () => void;

const createApplicationsStartInteractor =
  (
    repository: ApplicationRepository,
    mapper: PortsMapper,
    presenter: ApplicationsStartPresenter
  ): ApplicationsStartInteractor =>
  () =>
    repository
      .getApplications()
      .then(mapper.mapApplications)
      .then(presenter.presentApplicationsStartSuccess)
      .catch(presenter.presentApplicationsStartFailure);

export { createApplicationsStartInteractor, ApplicationsStartInteractor };

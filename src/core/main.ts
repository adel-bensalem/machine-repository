import { ApplicationRepository } from "./adapters/applicationRepository";
import { PortsMapper } from "./adapters/portsMapper";
import {
  ApplicationCreationInteractor,
  createApplicationCreationInteractor,
} from "./useCases/createApplication";
import {
  ApplicationsStartInteractor,
  createApplicationsStartInteractor,
} from "./useCases/startApplications";
import { ApplicationCreationPresenter } from "./adapters/applicationCreationPresenter";
import { ApplicationsStartPresenter } from "./adapters/applicationsStartPresenter";

interface Presenter
  extends ApplicationCreationPresenter,
    ApplicationsStartPresenter {}

type Dependencies = {
  applicationRepository: ApplicationRepository;
  presenter: Presenter;
  portsMapper: PortsMapper;
};

type Core = {
  createApplication: ApplicationCreationInteractor;
  startApplications: ApplicationsStartInteractor;
};

const createCore = (dependencies: Dependencies): Core => ({
  createApplication: createApplicationCreationInteractor(
    dependencies.applicationRepository,
    dependencies.presenter
  ),
  startApplications: createApplicationsStartInteractor(
    dependencies.applicationRepository,
    dependencies.portsMapper,
    dependencies.presenter
  ),
});

export {
  createCore,
  Core,
  Dependencies,
  ApplicationRepository,
  Presenter,
  PortsMapper,
};

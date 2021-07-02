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
import {
  RegistrationInteractor,
  createRegistrationInteractor,
} from "./useCases/register";
import { ApplicationCreationPresenter } from "./adapters/applicationCreationPresenter";
import { ApplicationsStartPresenter } from "./adapters/applicationsStartPresenter";
import { RegistrationPresenter } from "./adapters/registrationPresenter";
import { UserRepository } from "./adapters/userRepository";

interface Presenter
  extends ApplicationCreationPresenter,
    RegistrationPresenter,
    ApplicationsStartPresenter {}

type Dependencies = {
  applicationRepository: ApplicationRepository;
  userRepository: UserRepository;
  presenter: Presenter;
  portsMapper: PortsMapper;
};

type Core = {
  createApplication: ApplicationCreationInteractor;
  startApplications: ApplicationsStartInteractor;
  register: RegistrationInteractor;
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
  register: createRegistrationInteractor(
    dependencies.userRepository,
    dependencies.presenter
  ),
});

export {
  createCore,
  Core,
  Dependencies,
  ApplicationRepository,
  UserRepository,
  Presenter,
  PortsMapper,
};

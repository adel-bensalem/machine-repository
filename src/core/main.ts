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
import {
  AuthenticationInteractor,
  createAuthenticationInteractor,
} from "./useCases/authenticate";
import { ApplicationCreationPresenter } from "./adapters/applicationCreationPresenter";
import { ApplicationsStartPresenter } from "./adapters/applicationsStartPresenter";
import { RegistrationPresenter } from "./adapters/registrationPresenter";
import { UserRepository } from "./adapters/userRepository";
import { AuthenticationPresenter } from "./adapters/authenticationPresenter";
import { KeysVault } from "./adapters/keysVault";

interface Presenter
  extends ApplicationCreationPresenter,
    RegistrationPresenter,
    AuthenticationPresenter,
    ApplicationsStartPresenter {}

type Dependencies = {
  applicationRepository: ApplicationRepository;
  userRepository: UserRepository;
  presenter: Presenter;
  portsMapper: PortsMapper;
  keysVault: KeysVault;
};

type Core = {
  createApplication: ApplicationCreationInteractor;
  startApplications: ApplicationsStartInteractor;
  register: RegistrationInteractor;
  authenticate: AuthenticationInteractor;
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
    dependencies.keysVault,
    dependencies.presenter
  ),
  authenticate: createAuthenticationInteractor(
    dependencies.userRepository,
    dependencies.keysVault,
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
  KeysVault,
};

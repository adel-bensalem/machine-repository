import { ApplicationRepository } from "./adapters/applicationRepository";
import { PortsMapper } from "./adapters/portsMapper";
import { ApplicationCreationPresenter } from "./adapters/applicationCreationPresenter";
import { ApplicationsStartPresenter } from "./adapters/applicationsStartPresenter";
import { RegistrationPresenter } from "./adapters/registrationPresenter";
import { UserRepository } from "./adapters/userRepository";
import { AuthenticationPresenter } from "./adapters/authenticationPresenter";
import { ApplicationsRetrievalPresenter } from "./adapters/applicationsRetrievalPresenter";
import { ApplicationLogsRetrievalPresenter } from "./adapters/applicationLogsRetrievalPresenter";
import { DeploymentCreationPresenter } from "./adapters/deploymentCreationPresenter";
import { ApplicationDeploymentsRetrievalPresenter } from "./adapters/applicationDeploymentsRetrievalPresenter";
import { KeysVault } from "./adapters/keysVault";
import { LogsCollector } from "./adapters/logsCollector";
import { ApplicationDock } from "./adapters/applicationDock";
import { SafeGuard } from "./adapters/safeGuard";
import { DeploymentLog } from "./adapters/deploymentLog";
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
import {
  ApplicationsRetrievalInteractor,
  createApplicationsRetrievalInteractor,
} from "./useCases/retrieveApplications";
import {
  ApplicationLogsRetrievalInteractor,
  createApplicationLogsRetrievalInteractor,
} from "./useCases/retrieveApplicationLogs";
import {
  DeploymentCreationInteractor,
  createDeploymentCreationInteractor,
} from "./useCases/createDeployment";
import {
  ApplicationDeploymentsRetrievalInteractor,
  createApplicationDeploymentsRetrievalInteractor,
} from "./useCases/retrieveApplicationDeployments";

interface Presenter
  extends ApplicationCreationPresenter,
    RegistrationPresenter,
    AuthenticationPresenter,
    ApplicationsRetrievalPresenter,
    ApplicationLogsRetrievalPresenter,
    ApplicationDeploymentsRetrievalPresenter,
    DeploymentCreationPresenter,
    ApplicationsStartPresenter {}

type Dependencies = {
  applicationRepository: ApplicationRepository;
  userRepository: UserRepository;
  presenter: Presenter;
  portsMapper: PortsMapper;
  keysVault: KeysVault;
  logsCollector: LogsCollector;
  applicationDock: ApplicationDock;
  safeGuard: SafeGuard;
  deploymentLog: DeploymentLog;
};

type Core = {
  createApplication: ApplicationCreationInteractor;
  startApplications: ApplicationsStartInteractor;
  register: RegistrationInteractor;
  authenticate: AuthenticationInteractor;
  retrieveApplications: ApplicationsRetrievalInteractor;
  retrieveApplicationLogs: ApplicationLogsRetrievalInteractor;
  createDeployment: DeploymentCreationInteractor;
  retrieveApplicationDeployments: ApplicationDeploymentsRetrievalInteractor;
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
  retrieveApplications: createApplicationsRetrievalInteractor(
    dependencies.applicationRepository,
    dependencies.presenter
  ),
  retrieveApplicationLogs: createApplicationLogsRetrievalInteractor(
    dependencies.logsCollector,
    dependencies.applicationDock,
    dependencies.safeGuard,
    dependencies.applicationRepository,
    dependencies.presenter
  ),
  createDeployment: createDeploymentCreationInteractor(
    dependencies.applicationRepository,
    dependencies.deploymentLog,
    dependencies.presenter
  ),
  retrieveApplicationDeployments:
    createApplicationDeploymentsRetrievalInteractor(
      dependencies.deploymentLog,
      dependencies.safeGuard,
      dependencies.applicationRepository,
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
  LogsCollector,
  ApplicationDock,
  SafeGuard,
  DeploymentLog,
};

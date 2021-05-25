import { ApplicationRepository } from "./adapters/applicationRepository";
import {
  ApplicationCreationInteractor,
  createApplicationCreationInteractor,
} from "./useCases/createApplication";
import { ApplicationCreationPresenter } from "./adapters/applicationCreationPresenter";

interface Presenter extends ApplicationCreationPresenter {}

type Dependencies = {
  applicationRepository: ApplicationRepository;
  presenter: Presenter;
};

type Core = {
  createApplication: ApplicationCreationInteractor;
};

const createCore = (dependencies: Dependencies): Core => ({
  createApplication: createApplicationCreationInteractor(
    dependencies.applicationRepository,
    dependencies.presenter
  ),
});

export { createCore, Core, Dependencies, ApplicationRepository, Presenter };

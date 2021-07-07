import { Response } from "express";
import { Presenter } from "@core";

const createPresenter = (response: Response): Presenter => ({
  presentApplicationLogsRetrievalSuccess(logs) {
    response.status(200).send(logs);
  },
  presentApplicationLogsRetrievalFailure(error) {
    response
      .status(
        error.wasApplicationNotFound
          ? 404
          : error.isApplicationNotRunning
          ? 403
          : 404
      )
      .send(error);
  },
  presentApplicationsRetrievalFailure(error): void {
    response.status(error.wasUserNotFound ? 404 : 500).send(error);
  },
  presentApplicationsRetrievalSuccess(applications): void {
    response.status(200).send(applications);
  },
  presentAuthenticationFailure(error) {
    response
      .status(
        error.wasAccountNotFound ? 404 : error.areCredentialsInvalid ? 403 : 404
      )
      .send(error);
  },
  presentAuthenticationSuccess(key, user) {
    response.status(200).send({ key, user });
  },
  presentApplicationCreationSuccess: (app) => response.status(200).send(app),
  presentApplicationCreationFailure: (error) =>
    response.status(403).send(error),
  presentApplicationsStartSuccess() {},
  presentApplicationsStartFailure() {},
  presentRegistrationSuccess(user) {
    response.status(200).send(user);
  },
  presentRegistrationFailure(error) {
    response
      .status(
        error.doesUserAlreadyExists || error.wasPermissionDenied
          ? 403
          : error.hasInvalidEmail || error.hasInvalidPassword
          ? 400
          : 500
      )
      .send(error);
  },
});

export { createPresenter };

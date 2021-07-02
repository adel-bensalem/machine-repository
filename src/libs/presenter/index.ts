import { Response } from "express";
import { Presenter } from "@core";

const createPresenter = (response: Response): Presenter => ({
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

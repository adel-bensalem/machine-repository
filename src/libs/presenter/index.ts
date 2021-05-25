import { Response } from "express";
import { Presenter } from "@core";

const createPresenter = (response: Response): Presenter => ({
  presentApplicationCreationSuccess: (app) => response.status(200).send(app),
  presentApplicationCreationFailure: (error) =>
    response.status(403).send(error),
});

export { createPresenter };

import { DeploymentLog } from "@core";
import { Db } from "mongodb";

const createTag = (): string =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });

const createDeploymentLog = (db: Db): DeploymentLog => ({
  tagDeployment: (application) =>
    db
      .collection("deployments")
      .insertOne({ tag: createTag(), application, date: new Date() })
      .then(({ insertedId, ops: [{ _id, ...deployment }] }) => ({
        ...deployment,
        id: insertedId,
      })),
  retrieveDeployments: ({ name }) =>
    db
      .collection("deployments")
      .find({ "application.name": { $eq: name } })
      .toArray()
      .then((deployments) =>
        deployments.map(({ _id, ...deployments }) => ({
          ...deployments,
          id: _id,
        }))
      ),
  retrieveDeployment: (tag: string) =>
    new Promise((resolve, reject) =>
      db
        .collection("deployments")
        .findOne({ tag: { $eq: tag } })
        .then((deployment) =>
          deployment ? resolve({ ...deployment, id: deployment._id }) : reject()
        )
    ),
});

export { createDeploymentLog };

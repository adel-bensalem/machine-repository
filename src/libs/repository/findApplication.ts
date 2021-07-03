import { Application } from "@types";
import { Db } from "mongodb";
import { NodeSSH } from "node-ssh";

const findApplication = (db: Db, ssh: NodeSSH) => (application: Application) =>
  db.collection("applications").findOne({ name: { $eq: application.name } });

export { findApplication };

import { Application } from "@types";
import { Db } from "mongodb";

const findApplication = (db: Db) => (application: Application) =>
  db.collection("applications").findOne({ name: { $eq: application.name } });

export { findApplication };

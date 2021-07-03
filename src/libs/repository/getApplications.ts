import { Db } from "mongodb";

const getApplications = (db: Db) => () =>
  db.collection("applications").find().toArray();

export { getApplications };

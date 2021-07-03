import { Db } from "mongodb";
import { NodeSSH } from "node-ssh";
import { Repository } from "./types";
import { saveApplication } from "./saveApplication";
import { findApplication } from "./findApplication";
import { getApplications } from "./getApplications";
import { saveAccount } from "./saveAccount";
import { findUser } from "./findUser";

const createRepository = (db: Db, ssh: NodeSSH): Repository => ({
  saveApplication: saveApplication(db, ssh),
  findApplication: findApplication(db, ssh),
  getApplications: getApplications(db),
  saveAccount: saveAccount(),
  findUser: findUser(),
});

export { createRepository };

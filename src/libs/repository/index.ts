import { Db } from "mongodb";
import { NodeSSH } from "node-ssh";
import { Repository } from "./types";

const ansibleLocation = process.env.ANSIBLE_LOCATION;

const createRepository = (db: Db, ssh: NodeSSH): Repository => ({
  saveApplication: (application) =>
    ssh
      .execCommand(
        `ansible-playbook -i ${ansibleLocation}/inventory -e "application_name=${application.name}" ${ansibleLocation}/create-application.yml`
      )
      .then(() => db.collection("applications").insertOne(application))
      .then(() => application),
  findApplication: (application) =>
    db.collection("applications").findOne({ name: { $eq: application.name } }),
});

export { createRepository };

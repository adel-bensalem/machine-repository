import { Db } from "mongodb";
import { NodeSSH } from "node-ssh";
import axios from "axios";
import { Repository } from "./types";

const ansibleLocation = process.env.ANSIBLE_LOCATION;
const iamUrl = process.env.IAM_SERVICE_URL;

const createRepository = (db: Db, ssh: NodeSSH): Repository => ({
  saveApplication: (application) =>
    ssh
      .execCommand(
        `ansible-playbook -i ${ansibleLocation}/inventory -e "application_name=${application.name} db_name=${process.env.DB_NAME} db_user=${process.env.DB_USER} db_password=${process.env.DB_PASSWORD}" ${ansibleLocation}/create-application.yml`
      )
      .then(() => db.collection("applications").insertOne(application))
      .then(() => application),
  findApplication: (application) =>
    db.collection("applications").findOne({ name: { $eq: application.name } }),
  getApplications: () => db.collection("applications").find().toArray(),
  saveAccount: ({ email: name, password }) =>
    new Promise((resolve, reject) =>
      axios
        .post(`${iamUrl}/users`, { name, password })
        .then(({ data }) => resolve(data))
        .catch((error) =>
          reject(
            !!error.response
              ? error.response.data
              : !!error.request
              ? error.request
              : error
          )
        )
    ),
});

export { createRepository };

import { Db } from "mongodb";
import { NodeSSH } from "node-ssh";
import { Application, Identifiable, User } from "@types";
import axios from "axios";

const ansibleLocation = process.env.ANSIBLE_LOCATION;
const iamUrl = process.env.IAM_SERVICE_URL;

const saveApplication =
  (db: Db, ssh: NodeSSH) =>
  (application: Application, user: Identifiable<User>) =>
    ssh
      .execCommand(
        `ansible-playbook -i ${ansibleLocation}/inventory -e "application_name=${application.name} db_name=${process.env.DB_NAME} db_user=${process.env.DB_USER} db_password=${process.env.DB_PASSWORD}" ${ansibleLocation}/create-application.yml`
      )
      .then(() => db.collection("applications").insertOne(application))
      .then(
        () =>
          new Promise((resolve, reject) =>
            axios
              .put(
                `${iamUrl}/users/${user.id}/resources/application.${application.name}/permissions`,
                {
                  canRead: true,
                  canWrite: true,
                  canExecute: true,
                }
              )
              .then(resolve)
              .catch((error) =>
                reject(
                  !!error.response
                    ? error.response.data
                    : !!error.request
                    ? error.request
                    : error
                )
              )
          )
      )
      .then(() => application);

export { saveApplication };

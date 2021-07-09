import { ApplicationDock } from "@core";
import { NodeSSH } from "node-ssh";

const ansibleLocation = process.env.ANSIBLE_LOCATION;

const createApplicationDock = (ssh: NodeSSH): ApplicationDock => ({
  isApplicationRunning: ({ name }) =>
    new Promise<void>((resolve, reject) =>
      ssh
        .execCommand(`docker container inspect ${name}`)
        .then(({ stderr, code }) =>
          (code !== null && code !== 0) || !!stderr ? reject() : resolve()
        )
    ),
  deployApplicationAtTag: ({ name }, { tag }) =>
    new Promise<void>((resolve, reject) =>
      ssh
        .execCommand(
          `ansible-playbook -i ${ansibleLocation}/inventory -e '{"application_name":"${name}", "tag": "${tag}", "db_name": "${process.env.DB_NAME}", "db_user": "${process.env.DB_USER}", "db_password": "${process.env.DB_PASSWORD}"}' ${ansibleLocation}/rollback-application.yml`
        )
        .then(() => resolve())
        .catch(reject)
    ),
});

export { createApplicationDock };

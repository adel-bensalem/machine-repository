import { PortsMapper } from "@core";
import { NodeSSH } from "node-ssh";

const ansibleLocation = process.env.ANSIBLE_LOCATION;

const createPortsMapper = (ssh: NodeSSH): PortsMapper => ({
  mapApplications: (applications) =>
    new Promise((resolve, reject) =>
      applications.length > 0
        ? ssh
            .execCommand(
              `ansible-playbook -i ${ansibleLocation}/inventory -e '{"applications":[${applications
                .map(({ name }) => `"${name}"`)
                .join(",")}], "db_name": "${
                process.env.DB_NAME
              }", "db_user": "${process.env.DB_USER}", "db_password": "${
                process.env.DB_PASSWORD
              }"}' ${ansibleLocation}/start-applications.yml`
            )
            .then(({ code }) =>
              code !== null && code !== 0 ? reject() : resolve()
            )
            .catch(reject)
        : resolve()
    ),
});

export { createPortsMapper };

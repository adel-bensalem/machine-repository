import { Repository } from "./types";
import { connectToHost } from "./ssh";

const ansibleLocation =
  process.env.ANSIBLE_LOCATION || "/etc/ansible/voltron-control-node";
const repositoriesLocation =
  process.env.REPOSITORIES_LOCATION || "/etc/ansible/voltron-control-node";

const createRepository = (): Repository => ({
  saveApplication: (application) =>
    connectToHost().then((connection) =>
      connection
        .execCommand(
          `ansible-playbook -i ${ansibleLocation}/inventory -e "application_name=${application.name}" ${ansibleLocation}/create-application.yml`
        )
        .then(() => application)
        .finally(() => connection.dispose())
    ),
  findApplication: (application) =>
    connectToHost().then((connection) =>
      connection
        .execCommand(`[ -d ${repositoriesLocation}/${application.name}.git ]`)
        .then(({ code }) => (code === 1 ? null : application))
        .finally(() => connection.dispose())
    ),
});

export { createRepository };

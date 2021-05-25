import { Repository } from "./types";
import { connectToHost } from "./ssh";

const createRepository = (): Repository => ({
  saveApplication: (application) =>
    connectToHost().then((connection) =>
      connection
        .execCommand(
          `ansible-playbook -i /etc/ansible/voltron-control-node/inventory -e "application_name=${application.name}" /etc/ansible/voltron-control-node/create-application.yml`
        )
        .then(() => application)
        .finally(() => connection.dispose())
    ),
  findApplication: (application) =>
    connectToHost().then((connection) =>
      connection
        .execCommand(`[ -d /srv/git/${application.name}.git ]`)
        .then(({ code }) => (code === 1 ? null : application))
        .finally(() => connection.dispose())
    ),
});

export { createRepository };

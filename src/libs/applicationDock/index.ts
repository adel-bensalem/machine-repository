import { ApplicationDock } from "@core";
import { NodeSSH } from "node-ssh";

const createApplicationDock = (ssh: NodeSSH): ApplicationDock => ({
  isApplicationRunning: ({ name }) =>
    new Promise<void>((resolve, reject) =>
      ssh
        .execCommand(`docker container inspect ${name}`)
        .then(({ stderr, code }) =>
          (code !== null && code !== 0) || !!stderr ? reject() : resolve()
        )
    ),
});

export { createApplicationDock };

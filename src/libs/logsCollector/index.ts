import { NodeSSH } from "node-ssh";
import { LogsCollector } from "@core";

const createLogsCollector = (ssh: NodeSSH): LogsCollector => ({
  collectLogs: ({ name }) =>
    new Promise<string[]>((resolve, reject) =>
      ssh
        .execCommand(`docker container logs ${name}`)
        .then(({ stdout, stderr, code }) =>
          (code !== null && code !== 0) || !!stderr
            ? reject()
            : resolve(stdout.split("\n"))
        )
    ),
});

export { createLogsCollector };

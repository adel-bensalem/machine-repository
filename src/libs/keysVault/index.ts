import { NodeSSH } from "node-ssh";
import { KeysVault } from "@core";

const host = process.env.HOST_ADDRESS;

function createKeysVault(ssh: NodeSSH): KeysVault {
  return {
    createKey(user): Promise<string> {
      return ssh
        .execCommand(
          `ssh-keygen -q -t rsa -b 4096 -N "" -f ~/.ssh/${user.email} -C "${user.email}" && ssh-copy-id -i ~/.ssh/${user.email} git@${host} && cat ~/.ssh/${user.email}`
        )
        .then(({ stdout }) => stdout);
    },
    retrieveKey(user): Promise<string> {
      return ssh
        .execCommand(`cat ~/.ssh/${user.email}`)
        .then(({ stdout }) => stdout);
    },
  };
}

export { createKeysVault };

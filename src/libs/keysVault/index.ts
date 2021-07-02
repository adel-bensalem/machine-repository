import { NodeSSH } from "node-ssh";
import { Db } from "mongodb";
import { KeysVault } from "@core";

function createKeysVault(db: Db, ssh: NodeSSH): KeysVault {
  return {
    createKey(user): Promise<string> {
      return ssh
        .execCommand(
          `ssh-keygen -q -t rsa -b 4096 -N "" -f ~/.ssh/${user.email} && cat ~/.ssh/${user.email}`
        )
        .then(({ stdout }) => stdout)
        .then((key) =>
          db
            .collection("keys")
            .insertOne({ owner: user, key })
            .then(() => key)
        );
    },
  };
}

export { createKeysVault };

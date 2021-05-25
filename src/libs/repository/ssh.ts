import { NodeSSH } from "node-ssh";

const host = process.env.HOST_ADDRESS || "192.168.0.43";
const user = process.env.HOST_USER || "git";
const key = process.env.HOST_KEY || "~/.ssh/id_rsa";

const connectToHost = (): Promise<NodeSSH> => {
  const connection = new NodeSSH();

  return connection
    .connect({ host, username: user, privateKey: key })
    .then(() => connection);
};

export { connectToHost };

import { User } from "@types";

interface KeysVault {
  createKey(user: User): Promise<string>;
  retrieveKey(user: User): Promise<string>;
}

export { KeysVault };

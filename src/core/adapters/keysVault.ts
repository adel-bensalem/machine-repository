import { Identifiable, User } from "@types";

interface KeysVault {
  createKey(user: Identifiable<User>): Promise<string>;
}

export { KeysVault };

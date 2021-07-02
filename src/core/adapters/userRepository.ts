import { Credentials, User } from "@types";

interface UserRepository {
  saveAccount(user: User): Promise<User>;
  findUser(credentials: Credentials): Promise<User>;
}

export { UserRepository };

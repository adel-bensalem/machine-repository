import { Credentials, Identifiable, User } from "@types";

interface UserRepository {
  saveAccount(user: User): Promise<User>;
  findUser(credentials: Credentials): Promise<Identifiable<User>>;
}

export { UserRepository };

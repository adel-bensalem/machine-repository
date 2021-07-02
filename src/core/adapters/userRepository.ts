import { Identifiable, User } from "@types";

interface UserRepository {
  saveAccount(user: User): Promise<Identifiable<User>>;
}

export { UserRepository };

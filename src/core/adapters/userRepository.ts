import { User } from "../../types/user";

interface UserRepository {
  saveAccount(user: User): Promise<User>;
}

export { UserRepository };

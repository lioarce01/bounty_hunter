import { UserRepository } from "../../../Domain/repositories/UserRepository";
import { User } from "../../../Domain/entities/User";

export class GetAllUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[] | null> {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}

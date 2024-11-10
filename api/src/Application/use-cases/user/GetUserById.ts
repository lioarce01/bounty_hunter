import { User } from "../../../Domain/entities/User";
import { UserRepository } from "../../../Domain/repositories/UserRepository";

export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);

    return user;
  }
}

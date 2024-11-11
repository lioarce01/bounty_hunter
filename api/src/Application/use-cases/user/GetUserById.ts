import { inject, injectable } from "tsyringe";
import { User } from "../../../Domain/entities/User";
import { UserRepository } from "../../../Domain/repositories/UserRepository";

@injectable()
export class GetUserById {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);

    return user;
  }
}

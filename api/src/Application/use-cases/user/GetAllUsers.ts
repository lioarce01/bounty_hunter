import { UserRepository } from "../../../Domain/repositories/UserRepository";
import { User } from "../../../Domain/entities/User";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllUsers {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(): Promise<User[] | null> {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}

import { UserRepository } from "../../../Domain/repositories/UserRepository";
import { User } from "../../../Domain/entities/User";
import { inject, injectable } from "tsyringe";
import {
  UserFilter,
  UserFilters,
} from "../../../Infrastructure/filters/UserFilter";

@injectable()
export class GetFilteredUsers {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(filters?: UserFilters): Promise<User[] | null> {
    const filter = new UserFilter(filters);
    const users = await this.userRepository.getAllUsers(filter);
    return users;
  }
}

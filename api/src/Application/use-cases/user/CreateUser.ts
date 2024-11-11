import { UserRepository } from "../../../Domain/repositories/UserRepository";
import { User } from "../../../Domain/entities/User";
import { Prisma } from "@prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUser {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(userData: Partial<User>): Promise<User> {
    if (!userData.name || !userData.email) {
      throw new Error("Missing required fields");
    }

    const userCreateData: Prisma.UserCreateInput = {
      name: userData.name,
      email: userData.email,
      companyName: userData.companyName ?? null,
      companyDescription: userData.companyDescription ?? null,
      companyURL: userData.companyURL ?? null,
    };

    const { user } = await this.userRepository.createUser(userCreateData);
    return user;
  }
}

import { Prisma } from "@prisma/client";
import { User } from "../../../Domain/entities/User";
import { UserRepository } from "../../../Domain/repositories/UserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUser {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(
    id: string,
    userData: Partial<User>
  ): Promise<{ message: string; user: User }> {
    const userUpdateData: Prisma.UserUpdateInput = {
      name: userData.name,
      companyName: userData.companyName ?? null,
      companyDescription: userData.companyDescription ?? null,
      companyURL: userData.companyURL ?? null,
    };

    const { message, user } = await this.userRepository.updateUser(
      id,
      userUpdateData
    );
    return { message, user };
  }
}

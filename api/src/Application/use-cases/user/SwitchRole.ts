import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../../Domain/repositories/UserRepository";

@injectable()
export class SwitchRole {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(id: string): Promise<{ message: string }> {
    const { message } = await this.userRepository.switchRole(id);
    return {
      message,
    };
  }
}

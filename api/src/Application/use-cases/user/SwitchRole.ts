import { UserRepository } from "../../../Domain/repositories/UserRepository";

export class SwitchRole {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const { message } = await this.userRepository.switchRole(id);
    return {
      message,
    };
  }
}

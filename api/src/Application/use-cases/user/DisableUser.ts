import { UserRepository } from "../../../Domain/repositories/UserRepository";

export class DisableUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const { message } = await this.userRepository.disableUser(id);

    return {
      message,
    };
  }
}

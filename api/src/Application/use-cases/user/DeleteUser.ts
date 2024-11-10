import { UserRepository } from "../../../Domain/repositories/UserRepository";

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const { message } = await this.userRepository.deleteUser(id);
    return {
      message,
    };
  }
}

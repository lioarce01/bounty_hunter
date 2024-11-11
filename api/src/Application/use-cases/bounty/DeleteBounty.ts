import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";

export class DeleteBounty {
  constructor(private bountyRepository: BountyRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const { message } = await this.bountyRepository.deleteBounty(id);
    return { message };
  }
}

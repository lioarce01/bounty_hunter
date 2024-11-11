import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";

export class CreateBounty {
  constructor(private bountyRepository: BountyRepository) {}

  async execute(
    bountyData: Partial<Bounty>
  ): Promise<{ message: string; bounty: Bounty }> {
    const { message, bounty } = await this.bountyRepository.createBounty(
      bountyData
    );
    return {
      message,
      bounty,
    };
  }
}

import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";

export class UpdateBounty {
  constructor(private bountyRepository: BountyRepository) {}

  async execute(
    id: string,
    bountyData: Partial<Bounty>
  ): Promise<{ message: string; bounty: Bounty }> {
    const { message, bounty } = await this.bountyRepository.updateBounty(
      id,
      bountyData
    );
    return {
      message,
      bounty,
    };
  }
}

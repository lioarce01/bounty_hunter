import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";

export class GetAllBounties {
  constructor(private bountyRepository: BountyRepository) {}

  async execute(): Promise<Bounty[]> {
    const bounties = await this.bountyRepository.getAllBounties();
    return bounties;
  }
}

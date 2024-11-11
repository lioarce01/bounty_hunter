import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";

export class GetBountyByCompanyId {
  constructor(private bountyRepository: BountyRepository) {}

  async execute(id: string): Promise<Bounty[] | null> {
    const bounties = await this.bountyRepository.getBountyByCompanyId(id);
    return bounties;
  }
}

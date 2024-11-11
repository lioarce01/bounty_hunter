import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";

export class CloseBounty {
  constructor(private bountyRepository: BountyRepository) {}

  async execute(id: string): Promise<Bounty> {
    const bounty = await this.bountyRepository.closeBounty(id);
    return bounty;
  }
}

import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";

export class GetBountyById {
  constructor(private bountyRepository: BountyRepository) {}

  async execute(id: string): Promise<Bounty | null> {
    const bounty = await this.bountyRepository.getBountyById(id);
    return bounty;
  }
}

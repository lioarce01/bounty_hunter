import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetBountyByCompanyId {
  constructor(
    @inject("BountyRepository")
    private bountyRepository: BountyRepository
  ) {}

  async execute(id: string): Promise<Bounty[] | null> {
    const bounties = await this.bountyRepository.getBountyByCompanyId(id);
    return bounties;
  }
}

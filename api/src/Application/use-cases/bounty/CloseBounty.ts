import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";
import { inject, injectable } from "tsyringe";

@injectable()
export class CloseBounty {
  constructor(
    @inject("BountyRepository")
    private bountyRepository: BountyRepository
  ) {}

  async execute(id: string): Promise<Bounty> {
    const bounty = await this.bountyRepository.closeBounty(id);
    return bounty;
  }
}

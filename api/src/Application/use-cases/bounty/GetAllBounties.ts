import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllBounties {
  constructor(
    @inject("BountyRepository")
    private bountyRepository: BountyRepository
  ) {}

  async execute(): Promise<Bounty[]> {
    const bounties = await this.bountyRepository.getAllBounties();
    return bounties;
  }
}

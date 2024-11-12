import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";
import { inject, injectable } from "tsyringe";
import {
  BountyFilter,
  BountyFilters,
} from "../../../Infrastructure/filters/BountyFilter";

@injectable()
export class GetAllBounties {
  constructor(
    @inject("BountyRepository")
    private bountyRepository: BountyRepository
  ) {}

  async execute(filters?: BountyFilters): Promise<Bounty[]> {
    const filter = new BountyFilter(filters);
    const bounties = await this.bountyRepository.getAllBounties(filter);
    return bounties;
  }
}

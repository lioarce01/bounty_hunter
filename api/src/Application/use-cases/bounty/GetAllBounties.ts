import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";
import { inject, injectable } from "tsyringe";
import {
  BountyFilter,
  BountyFilters,
  BountySortOptions,
} from "../../../Infrastructure/filters/BountyFilter";

@injectable()
export class GetAllBounties {
  constructor(
    @inject("BountyRepository")
    private bountyRepository: BountyRepository
  ) {}

  async execute(
    filters?: BountyFilters,
    sortOptions?: BountySortOptions
  ): Promise<Bounty[]> {
    const filter = new BountyFilter(filters, sortOptions);
    const bounties = await this.bountyRepository.getAllBounties(filter);
    return bounties;
  }
}

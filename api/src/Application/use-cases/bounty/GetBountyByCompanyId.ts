import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";
import { inject, injectable } from "tsyringe";
import {
  BountyFilter,
  BountyFilters,
  BountySortOptions,
} from "../../../Infrastructure/filters/BountyFilter";

@injectable()
export class GetBountyByCompanyId {
  constructor(
    @inject("BountyRepository")
    private bountyRepository: BountyRepository
  ) {}

  async execute(
    id: string,
    filters?: BountyFilters,
    sortOptions?: BountySortOptions
  ): Promise<Bounty[] | null> {
    const filter = new BountyFilter(filters, sortOptions);
    const bounties = await this.bountyRepository.getBountyByCompanyId(
      id,
      filter
    );
    return bounties;
  }
}

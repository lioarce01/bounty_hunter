import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";
import { inject, injectable } from "tsyringe";
import {
  BountyFilter,
  BountyFilters,
} from "../../../Infrastructure/filters/BountyFilter";

@injectable()
export class GetBountyByCompanyId {
  constructor(
    @inject("BountyRepository")
    private bountyRepository: BountyRepository
  ) {}

  async execute(id: string, filters?: BountyFilters): Promise<Bounty[] | null> {
    const filter = new BountyFilter(filters);
    const bounties = await this.bountyRepository.getBountyByCompanyId(
      id,
      filter
    );
    return bounties;
  }
}

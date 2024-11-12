import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetBountyById {
  constructor(
    @inject("BountyRepository")
    private bountyRepository: BountyRepository
  ) {}

  async execute(id: string): Promise<Bounty | null> {
    const bounty = await this.bountyRepository.getBountyById(id);
    return bounty;
  }
}

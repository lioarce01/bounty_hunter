import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateBounty {
  constructor(
    @inject("BountyRepository")
    private bountyRepository: BountyRepository
  ) {}

  async execute(
    bountyData: Partial<Bounty>
  ): Promise<{ message: string; bounty: Bounty }> {
    const { message, bounty } = await this.bountyRepository.createBounty(
      bountyData
    );
    return {
      message,
      bounty,
    };
  }
}

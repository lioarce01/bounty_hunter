import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateBounty {
  constructor(
    @inject("BountyRepository")
    private bountyRepository: BountyRepository
  ) {}

  async execute(
    id: string,
    bountyData: Partial<Bounty>
  ): Promise<{ message: string; bounty: Bounty }> {
    const { message, bounty } = await this.bountyRepository.updateBounty(
      id,
      bountyData
    );
    return {
      message,
      bounty,
    };
  }
}

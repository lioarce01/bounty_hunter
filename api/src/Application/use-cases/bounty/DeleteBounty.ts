import { BountyRepository } from "../../../Domain/repositories/BountyRepository";
import { Bounty } from "../../../Domain/entities/Bounty";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteBounty {
  constructor(
    @inject("BountyRepository")
    private bountyRepository: BountyRepository
  ) {}

  async execute(id: string): Promise<{ message: string }> {
    const { message } = await this.bountyRepository.deleteBounty(id);
    return { message };
  }
}

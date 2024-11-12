import { Bounty } from "../entities/Bounty";

export interface BountyRepository {
  getAllBounties(): Promise<Bounty[]>;
  getBountyById(id: string): Promise<Bounty | null>;
  getBountyByCompanyId(userId: string): Promise<Bounty[] | null>;
  createBounty(
    bounty: Partial<Bounty>
  ): Promise<{ message: string; bounty: Bounty }>;
  updateBounty(
    id: string,
    bountyData: Partial<Bounty>
  ): Promise<{ message: string; bounty: Bounty }>;
  deleteBounty(id: string): Promise<{ message: string }>;
  closeBounty(id: string): Promise<Bounty>;
}

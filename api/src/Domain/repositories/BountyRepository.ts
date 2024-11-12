import { BountyFilter } from "../../Infrastructure/filters/BountyFilter";
import { Bounty } from "../entities/Bounty";

export interface BountyRepository {
  getAllBounties(filter?: BountyFilter): Promise<Bounty[]>;
  getBountyById(id: string): Promise<Bounty | null>;
  getBountyByCompanyId(
    userId: string,
    filter?: BountyFilter
  ): Promise<Bounty[] | null>;
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

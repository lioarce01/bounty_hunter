import { Bounty, ReportStatus, User } from "@prisma/client";

export class Report {
  constructor(
    public id: string,
    public details: string,
    public evidence: string,
    public status: ReportStatus,
    public bountyId: string,
    public hunderId: string,
    public bounty?: Bounty,
    public hunter?: User
  ) {}
}

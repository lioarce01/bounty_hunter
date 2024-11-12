import { BountyStatus, User, Report } from "@prisma/client";

export class Bounty {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public reward: number,
    public status: BountyStatus,
    public userId: string,
    public createdAt: Date,
    public updatedAt: Date,
    public company?: User,
    public reports?: { id: string }[] | Report[]
  ) {}

  close(): void {
    if (this.status !== BountyStatus.OPEN) {
      throw new Error("Bounty is already closed");
    }
    this.status = BountyStatus.CLOSED;
  }
}

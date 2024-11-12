import { Role, UserStatus, Report, BountyStatus } from "@prisma/client";

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: Role,
    public status: UserStatus,
    public companyName: string | null,
    public companyDescription: string | null,
    public companyURL: string | null,
    public bounties?:
      | { id: string }[]
      | {
          id: string;
          status: BountyStatus;
          title: string;
          description: string;
          reward: number;
          createdAt: Date;
          updatedAt: Date;
        }[],
    public reports?: { id: string }[] | Report[]
  ) {}
}

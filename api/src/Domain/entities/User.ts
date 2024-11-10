import { Role, UserStatus } from "@prisma/client";

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: Role,
    public status: UserStatus,
    public companyName: string | null,
    public companyDescription: string | null,
    public companyURL: string | null
  ) {}
}

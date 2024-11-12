import { Prisma, Role, UserStatus } from "@prisma/client";

export interface UserFilters {
  role?: Role;
  status?: UserStatus;
}

export class UserFilter {
  private filters: UserFilters;

  constructor(filters?: UserFilters) {
    this.filters = filters || {};
  }

  public buildWhereClause(): Prisma.UserWhereInput {
    const whereClause: Prisma.UserWhereInput = {};

    if (this.filters.role) {
      whereClause.role = this.filters.role;
    }

    if (this.filters.status) {
      whereClause.status = this.filters.status;
    }

    return whereClause;
  }
}

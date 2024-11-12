import { Prisma, BountyStatus } from "@prisma/client";

export interface BountyFilters {
  status?: BountyStatus;
  category?: string;
}

export class BountyFilter {
  private filters: BountyFilters = {};
  constructor(filters?: BountyFilters) {
    this.filters = filters || {};
  }

  public buildWhereClause(): Prisma.BountyWhereInput {
    const whereClause: Prisma.BountyWhereInput = {};

    if (this.filters.status) {
      whereClause.status = this.filters.status;
    }

    if (this.filters.category) {
      whereClause.category = this.filters.category;
    }

    return whereClause;
  }
}

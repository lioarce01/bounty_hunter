import { Prisma, BountyStatus } from "@prisma/client";

export interface BountyFilters {
  status?: BountyStatus;
  category?: string;
}

export interface BountySortOptions {
  sortBy?: "reward";
  sortOrder?: "asc" | "desc";
}

export class BountyFilter {
  private filters: BountyFilters = {};
  private sortOptions: BountySortOptions = {};

  constructor(filters?: BountyFilters, sortOptions?: BountySortOptions) {
    this.filters = filters || {};
    this.sortOptions = sortOptions || {};
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

  public buildOrderByClause(): Prisma.BountyOrderByWithRelationInput {
    const { sortBy, sortOrder } = this.sortOptions;
    const orderByClause: Prisma.BountyOrderByWithRelationInput = {};

    if (sortBy === "reward") {
      orderByClause.reward = sortOrder || "asc";
    }

    return orderByClause;
  }
}

import { Prisma, ReportStatus } from "@prisma/client";

export interface ReportFilters {
  status?: ReportStatus;
}

export class ReportFilter {
  private filters: ReportFilters = {};
  constructor(filters?: ReportFilters) {
    this.filters = filters || {};
  }

  public buildWhereClause(): Prisma.ReportWhereInput {
    const whereClause: Prisma.ReportWhereInput = {};

    if (this.filters.status) {
      whereClause.status = this.filters.status;
    }

    return whereClause;
  }
}

import { ReportRepository } from "../../../Domain/repositories/ReportRepository";
import { Report } from "../../../Domain/entities/Report";
import { inject, injectable } from "tsyringe";
import {
  ReportFilter,
  ReportFilters,
} from "../../../Infrastructure/filters/ReportFilter";

@injectable()
export class GetAllReports {
  constructor(
    @inject("ReportRepository")
    private reportRepository: ReportRepository
  ) {}

  async execute(filters?: ReportFilters): Promise<Report[]> {
    const filter = new ReportFilter(filters);
    return this.reportRepository.getAllReports(filter);
  }
}

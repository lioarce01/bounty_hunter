import { ReportRepository } from "../../../Domain/repositories/ReportRepository";
import { Report } from "../../../Domain/entities/Report";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetReportByUserId {
  constructor(
    @inject("ReportRepository")
    private reportRepository: ReportRepository
  ) {}

  async execute(userId: string): Promise<Report[] | null> {
    const reports = await this.reportRepository.getReportByUserId(userId);

    return reports;
  }
}

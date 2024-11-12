import { ReportRepository } from "../../../Domain/repositories/ReportRepository";
import { Report } from "../../../Domain/entities/Report";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateReport {
  constructor(
    @inject("ReportRepository")
    private reportRepository: ReportRepository
  ) {}

  async execute(
    reportData: Partial<Report>
  ): Promise<{ message: string; report: Report }> {
    const { message, report } = await this.reportRepository.createReport(
      reportData
    );

    return {
      message,
      report,
    };
  }
}

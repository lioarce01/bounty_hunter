import { ReportRepository } from "../../../Domain/repositories/ReportRepository";
import { Report } from "../../../Domain/entities/Report";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateReport {
  constructor(
    @inject("ReportRepository")
    private reportRepository: ReportRepository
  ) {}

  async execute(
    id: string,
    reportData: Partial<Report>
  ): Promise<{ message: string; report: Report }> {
    const { message, report } = await this.reportRepository.updateReport(
      id,
      reportData
    );

    return {
      message,
      report,
    };
  }
}

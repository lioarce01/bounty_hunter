import { ReportRepository } from "../../../Domain/repositories/ReportRepository";
import { Report } from "../../../Domain/entities/Report";
import { inject, injectable } from "tsyringe";

@injectable()
export class RejectReport {
  constructor(
    @inject("ReportRepository") private reportRepository: ReportRepository
  ) {}

  async execute(id: string): Promise<{ message: string; report: Report }> {
    const { message, report } = await this.reportRepository.rejectReport(id);
    return {
      message,
      report,
    };
  }
}

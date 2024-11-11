import { ReportRepository } from "../../../Domain/repositories/ReportRepository";
import { Report } from "../../../Domain/entities/Report";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetReportById {
  constructor(
    @inject("ReportRepository")
    private reportRepository: ReportRepository
  ) {}

  async execute(id: string): Promise<Report | null> {
    const report = await this.reportRepository.getReportById(id);
    return report;
  }
}

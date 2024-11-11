import { ReportRepository } from "../../../Domain/repositories/ReportRepository";
import { Report } from "../../../Domain/entities/Report";
import { inject, injectable } from "tsyringe";

@injectable()
export class CloseReport {
  constructor(
    @inject("ReportRepository") private reportRepository: ReportRepository
  ) {}

  async execute(id: string): Promise<Report> {
    const report = await this.reportRepository.closeReport(id);
    return report;
  }
}

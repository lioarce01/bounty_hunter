import { ReportRepository } from "../../../Domain/repositories/ReportRepository";
import { Report } from "../../../Domain/entities/Report";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllReports {
  constructor(
    @inject("ReportRepository")
    private reportRepository: ReportRepository
  ) {}

  async execute(): Promise<Report[]> {
    return this.reportRepository.getAllReports();
  }
}

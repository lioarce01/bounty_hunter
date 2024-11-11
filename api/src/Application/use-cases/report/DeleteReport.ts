import { ReportRepository } from "../../../Domain/repositories/ReportRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteReport {
  constructor(
    @inject("ReportRepository")
    private reportRepository: ReportRepository
  ) {}

  async execute(id: string): Promise<{ message: string }> {
    const { message } = await this.reportRepository.deleteReport(id);

    return { message };
  }
}

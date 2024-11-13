import { ReportStatus } from "@prisma/client";
import { Report } from "../entities/Report";
import { ReportFilter } from "../../Infrastructure/filters/ReportFilter";

export interface ReportRepository {
  getAllReports(filter?: ReportFilter): Promise<Report[]>;
  getReportById(id: string): Promise<Report | null>;
  getReportByUserId(userId: string): Promise<Report[] | null>;
  createReport(
    report: Partial<Report>
  ): Promise<{ message: string; report: Report }>;
  updateReport(
    id: string,
    report: Partial<Report>
  ): Promise<{ message: string; report: Report }>;
  deleteReport(id: string): Promise<{ message: string }>;
  approveReport(id: string): Promise<{ message: string; report: Report }>;
  rejectReport(id: string): Promise<{ message: string; report: Report }>;
}

import { ReportStatus } from "@prisma/client";
import { Report } from "../../Domain/entities/Report";
import { ReportRepository } from "../../Domain/repositories/ReportRepository";
import prisma from "../../config/config";
import { injectable } from "tsyringe";

@injectable()
export class PrismaReportRepository implements ReportRepository {
  //GET ALL REPORTS
  async getAllReports(): Promise<Report[]> {
    const reports = await prisma.report.findMany();

    return reports.map(
      (report) =>
        new Report(
          report.id,
          report.details,
          report.evidence,
          report.status,
          report.bountyId,
          report.hunterId
        )
    );
  }

  //GET REPORT BY ID
  async getReportById(id: string): Promise<Report | null> {
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        bounty: true,
        hunter: true,
      },
    });
    if (!report) return null;

    return new Report(
      report.id,
      report.details,
      report.evidence,
      report.status,
      report.bountyId,
      report.hunterId,
      report.bounty,
      report.hunter
    );
  }

  //GET REPORT BY USER ID
  async getReportByUserId(userId: string): Promise<Report[] | null> {
    const reports = await prisma.report.findMany({
      where: {
        hunterId: userId,
      },
    });

    if (!reports || reports.length === 0) return null;

    return reports.map(
      (report) =>
        new Report(
          report.id,
          report.details,
          report.evidence,
          report.status,
          report.bountyId,
          report.hunterId
        )
    );
  }

  //CREATE REPORT
  async createReport(
    reportData: Report
  ): Promise<{ message: string; report: Report }> {
    if (
      !reportData.details ||
      !reportData.evidence ||
      !reportData.hunterId ||
      !reportData.bountyId
    ) {
      throw new Error("Missing required fields");
    }

    const hunter = await prisma.user.findUnique({
      where: { id: reportData.hunterId },
    });

    if (!hunter) {
      throw new Error("Hunter not found");
    }

    const bounty = await prisma.bounty.findUnique({
      where: { id: reportData.bountyId },
    });

    if (!bounty) {
      throw new Error("Bounty not found");
    }

    const newReport = await prisma.report.create({
      data: {
        details: reportData.details,
        evidence: reportData.evidence,
        bountyId: reportData.bountyId,
        hunterId: reportData.hunterId,
      },
    });

    return {
      message: "Report created successfully",
      report: new Report(
        newReport.id,
        newReport.details,
        newReport.evidence,
        newReport.status,
        newReport.hunterId,
        newReport.bountyId
      ),
    };
  }

  //UPDATE REPORT
  async updateReport(
    id: string,
    reportData: Partial<Report>
  ): Promise<{ message: string; report: Report }> {
    const updatedReport = await prisma.report.update({
      where: { id },
      data: {
        details: reportData.details,
        evidence: reportData.evidence,
      },
    });

    return {
      message: "Report updated successfully",
      report: new Report(
        updatedReport.id,
        updatedReport.details,
        updatedReport.evidence,
        updatedReport.status,
        updatedReport.hunterId,
        updatedReport.bountyId
      ),
    };
  }

  //DELETE REPORT
  async deleteReport(id: string): Promise<{ message: string }> {
    await prisma.report.delete({
      where: { id },
    });

    return {
      message: "Report deleted successfully",
    };
  }

  //APPROVE REPORT
  async approveReport(
    id: string
  ): Promise<{ message: string; report: Report }> {
    const approvedReport = await prisma.report.update({
      where: { id },
      data: { status: ReportStatus.APPROVED },
    });

    return {
      message: "Report approved successfully",
      report: new Report(
        approvedReport.id,
        approvedReport.details,
        approvedReport.evidence,
        approvedReport.status,
        approvedReport.hunterId,
        approvedReport.bountyId
      ),
    };
  }

  //REJECT REPORT
  async rejectReport(id: string): Promise<{ message: string; report: Report }> {
    const rejectedReport = await prisma.report.update({
      where: { id },
      data: { status: ReportStatus.REJECTED },
    });

    return {
      message: "Report rejected successfully",
      report: new Report(
        rejectedReport.id,
        rejectedReport.details,
        rejectedReport.evidence,
        rejectedReport.status,
        rejectedReport.hunterId,
        rejectedReport.bountyId
      ),
    };
  }
}

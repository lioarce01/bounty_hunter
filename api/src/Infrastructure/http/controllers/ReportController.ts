import { NextFunction, Request, Response } from "express";
import { GetAllReports } from "../../../Application/use-cases/report/GetAllReports";
import { GetReportById } from "../../../Application/use-cases/report/GetReportById";
import { GetReportByUserId } from "../../../Application/use-cases/report/GetReportByUserId";
import { CreateReport } from "../../../Application/use-cases/report/CreateReport";
import { UpdateReport } from "../../../Application/use-cases/report/UpdateReport";
import { DeleteReport } from "../../../Application/use-cases/report/DeleteReport";
import { ApproveReport } from "../../../Application/use-cases/report/ApproveReport";
import { RejectReport } from "../../../Application/use-cases/report/RejectReport";
import { inject, injectable } from "tsyringe";
import { ReportStatus } from "@prisma/client";

@injectable()
export class ReportController {
  constructor(
    @inject(GetAllReports) private getAllReportsUseCase: GetAllReports,
    @inject(GetReportById) private getReportByIdUseCase: GetReportById,
    @inject(GetReportByUserId)
    private getReportByUserIdUseCase: GetReportByUserId,
    @inject(CreateReport) private createReportUseCase: CreateReport,
    @inject(UpdateReport) private updateReportUseCase: UpdateReport,
    @inject(DeleteReport) private deleteReportUseCase: DeleteReport,
    @inject(ApproveReport) private approveReportUseCase: ApproveReport,
    @inject(RejectReport) private rejectReportUseCase: RejectReport
  ) {}

  async getAllReports(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.query;
      const filters = {
        status: status as ReportStatus,
      };
      const reports = await this.getAllReportsUseCase.execute(filters);

      if (!reports || reports.length === 0) {
        return res.status(404).json({ message: "No reports found" });
      }

      res.status(200).json(reports);
    } catch (error) {
      next(error);
    }
  }

  async getReportById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const report = await this.getReportByIdUseCase.execute(id);

      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }

      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }

  async getReportByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const reports = await this.getReportByUserIdUseCase.execute(userId);

      if (!reports || reports.length === 0) {
        return res.status(404).json({ message: "No reports found" });
      }

      res.status(200).json(reports);
    } catch (error) {
      next(error);
    }
  }

  async createReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { details, evidence, hunterId, bountyId } = req.body;

      if (!details || !evidence || !hunterId || !bountyId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { message, report } = await this.createReportUseCase.execute({
        details,
        evidence,
        hunterId,
        bountyId,
      });

      res.status(201).json({ message, report });
    } catch (error) {
      next(error);
    }
  }

  async updateReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { details, evidence } = req.body;

      const { message, report } = await this.updateReportUseCase.execute(id, {
        details,
        evidence,
      });

      res.status(200).json({ message, report });
    } catch (error) {
      next(error);
    }
  }

  async deleteReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { message } = await this.deleteReportUseCase.execute(id);

      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  async approveReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { message, report } = await this.approveReportUseCase.execute(id);

      res.status(200).json({ message, report });
    } catch (error) {
      next(error);
    }
  }

  async rejectReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { message, report } = await this.rejectReportUseCase.execute(id);

      res.status(200).json({ message, report });
    } catch (error) {
      next(error);
    }
  }
}

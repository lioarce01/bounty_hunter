import express from "express";
import { ReportController } from "../controllers/ReportController";
import { setupContainer } from "../../DI/DIContainer";
import { container } from "tsyringe";

setupContainer();

const router = express.Router();

const reportController = container.resolve(ReportController);

router.get("/", (req, res, next) =>
  reportController.getAllReports(req, res, next)
);

router.get("/:id", (req, res, next) =>
  reportController.getReportById(req, res, next)
);

router.get("/user/:userId", (req, res, next) =>
  reportController.getReportByUserId(req, res, next)
);

router.post("/", (req, res, next) =>
  reportController.createReport(req, res, next)
);

router.put("/:id", (req, res, next) =>
  reportController.updateReport(req, res, next)
);

router.delete("/:id", (req, res, next) =>
  reportController.deleteReport(req, res, next)
);

router.put("/:id/approve", (req, res, next) =>
  reportController.approveReport(req, res, next)
);

router.put("/:id/reject", (req, res, next) =>
  reportController.rejectReport(req, res, next)
);

export default router;

import express from "express";
import userRoutes from "./UserRoutes";
import bountyRoutes from "./BountyRoutes";
import reportRoutes from "./ReportRoutes";
import "reflect-metadata";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/bounties", bountyRoutes);
router.use("/reports", reportRoutes);

export default router;

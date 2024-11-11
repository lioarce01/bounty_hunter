import express from "express";
import userRoutes from "./UserRoutes";
import bountyRoutes from "./BountyRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/bounties", bountyRoutes);

export default router;

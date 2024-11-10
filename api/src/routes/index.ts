import express from "express";
import userRoutes from "./user/userRoutes";
import bountyRoutes from "./bounty/bountyRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/bounties", bountyRoutes);

export default router;

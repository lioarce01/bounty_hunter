import express from "express";
import { BountyController } from "../controllers/BountyControllers";

const router = express.Router();

const bountyController = new BountyController();

router.get("/", bountyController.getAllBounties);
router.get("/:id", bountyController.getBountyById);
router.get("/company/:userId", bountyController.getBountyByCompanyId);
router.post("/", bountyController.createBounty);
router.put("/:id", bountyController.updateBounty);
router.delete("/:id", bountyController.deleteBounty);
router.put("/:id", bountyController.closeBounty);

export default router;

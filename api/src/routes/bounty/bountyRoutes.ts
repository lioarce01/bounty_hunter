import express from "express";
import BountyController from "../../controllers/bounty/bountyController";

const router = express.Router();

const bountyController = new BountyController();

router.get("/", bountyController.getAllBounties);
router.get("/:id", bountyController.getBountyById);
router.get("/:userId", bountyController.getBountyByCompanyId);
router.post("/", bountyController.createBounty);
router.put("/:id", bountyController.updateBounty);
router.delete("/:id", bountyController.deleteBounty);
router.put("/:id/close", bountyController.closeBounty);

export default router;

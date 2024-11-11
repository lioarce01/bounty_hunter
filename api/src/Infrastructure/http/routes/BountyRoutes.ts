import express from "express";
import { BountyController } from "../controllers/BountyControllers";
import { setupContainer } from "../../DI/container";
import { container } from "tsyringe";

setupContainer();

const router = express.Router();

const bountyController = container.resolve(BountyController);

router.get("/", (req, res, next) =>
  bountyController.getAllBounties(req, res, next)
);
router.get("/:id", (req, res, next) =>
  bountyController.getBountyById(req, res, next)
);
router.get("/company/:userId", (req, res, next) =>
  bountyController.getBountyByCompanyId(req, res, next)
);
router.post("/", (req, res, next) =>
  bountyController.createBounty(req, res, next)
);
router.put("/:id", (req, res, next) =>
  bountyController.updateBounty(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  bountyController.deleteBounty(req, res, next)
);
router.put("/:id", (req, res, next) =>
  bountyController.closeBounty(req, res, next)
);

export default router;

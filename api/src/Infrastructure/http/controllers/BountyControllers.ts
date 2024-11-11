import { NextFunction, Request, Response } from "express";
import { PrismaBountyRepository } from "../../repositories/PrismaBountyRepository";
import { GetAllBounties } from "../../../Application/use-cases/bounty/GetAllBounties";
import { GetBountyById } from "../../../Application/use-cases/bounty/GetBountyById";
import { GetBountyByCompanyId } from "../../../Application/use-cases/bounty/GetBountyByCompanyId";
import { CreateBounty } from "../../../Application/use-cases/bounty/CreateBounty";
import { UpdateBounty } from "../../../Application/use-cases/bounty/UpdateBounty";
import { DeleteBounty } from "../../../Application/use-cases/bounty/DeleteBounty";
import { CloseBounty } from "../../../Application/use-cases/bounty/CloseBounty";

const bountyRespository = new PrismaBountyRepository();

const getAllBounties = new GetAllBounties(bountyRespository);
const getBountyById = new GetBountyById(bountyRespository);
const getBountyByCompanyId = new GetBountyByCompanyId(bountyRespository);
const createBounty = new CreateBounty(bountyRespository);
const updateBounty = new UpdateBounty(bountyRespository);
const deleteBounty = new DeleteBounty(bountyRespository);
const closeBounty = new CloseBounty(bountyRespository);

export class BountyController {
  async getAllBounties(req: Request, res: Response, next: NextFunction) {
    try {
      const bounties = await getAllBounties.execute();

      if (!bounties || bounties.length === 0) {
        return res.status(404).json({ message: "No bounties found" });
      }

      res.status(200).json(bounties);
    } catch (error) {
      next(error);
    }
  }

  async getBountyById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const bounty = await getBountyById.execute(id);

      if (!bounty) {
        return res.status(404).json({ message: "Bounty not found" });
      }

      res.status(200).json(bounty);
    } catch (error) {
      next(error);
    }
  }

  async getBountyByCompanyId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const bounties = await getBountyByCompanyId.execute(id);

      if (!bounties || bounties.length === 0) {
        return res.status(404).json({ message: "No bounties found" });
      }

      res.status(200).json(bounties);
    } catch (error) {
      next(error);
    }
  }

  async createBounty(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, reward, userId } = req.body;

      if (!title || !description || !reward || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { message, bounty } = await createBounty.execute({
        title,
        description,
        reward,
        userId,
      });

      res.status(201).json({ message, bounty });
    } catch (error) {
      const e = error as Error;
      if (e.message === "Only companies can create bounties") {
        return res
          .status(403)
          .json({ message: "Only companies can create bounties" });
      }

      next(error);
    }
  }

  async updateBounty(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { bountyData } = req.body;

      const { message, bounty } = await updateBounty.execute(id, bountyData);

      res.status(200).json({ message, bounty });
    } catch (error) {
      next(error);
    }
  }

  async deleteBounty(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { message } = await deleteBounty.execute(id);

      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  async closeBounty(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const bounty = await closeBounty.execute(id);

      res.status(200).json(bounty);
    } catch (error) {
      next(error);
    }
  }
}

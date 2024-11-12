import { NextFunction, Request, Response } from "express";
import { GetAllBounties } from "../../../Application/use-cases/bounty/GetAllBounties";
import { GetBountyById } from "../../../Application/use-cases/bounty/GetBountyById";
import { GetBountyByCompanyId } from "../../../Application/use-cases/bounty/GetBountyByCompanyId";
import { CreateBounty } from "../../../Application/use-cases/bounty/CreateBounty";
import { UpdateBounty } from "../../../Application/use-cases/bounty/UpdateBounty";
import { DeleteBounty } from "../../../Application/use-cases/bounty/DeleteBounty";
import { CloseBounty } from "../../../Application/use-cases/bounty/CloseBounty";
import { inject, injectable } from "tsyringe";

@injectable()
export class BountyController {
  constructor(
    @inject(GetAllBounties) private getAllBountiesUseCase: GetAllBounties,
    @inject(GetBountyById) private getBountyByIdUseCase: GetBountyById,
    @inject(GetBountyByCompanyId)
    private getBountyByCompanyIdUseCase: GetBountyByCompanyId,
    @inject(CreateBounty) private createBountyUseCase: CreateBounty,
    @inject(UpdateBounty) private updateBountyUseCase: UpdateBounty,
    @inject(DeleteBounty) private deleteBountyUseCase: DeleteBounty,
    @inject(CloseBounty) private closeBountyUseCase: CloseBounty
  ) {}

  async getAllBounties(req: Request, res: Response, next: NextFunction) {
    try {
      const bounties = await this.getAllBountiesUseCase.execute();

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

      const bounty = await this.getBountyByIdUseCase.execute(id);

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

      const bounties = await this.getBountyByCompanyIdUseCase.execute(id);

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
      const { title, description, reward, userId, category } = req.body;

      if (!title || !description || !reward || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { message, bounty } = await this.createBountyUseCase.execute({
        title,
        description,
        reward,
        userId,
        category,
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
      const { title, description, reward } = req.body;

      const { message, bounty } = await this.updateBountyUseCase.execute(id, {
        title,
        description,
        reward,
      });

      res.status(200).json({ message, bounty });
    } catch (error) {
      next(error);
    }
  }

  async deleteBounty(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { message } = await this.deleteBountyUseCase.execute(id);

      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  async closeBounty(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const bounty = await this.closeBountyUseCase.execute(id);

      res.status(200).json(bounty);
    } catch (error) {
      next(error);
    }
  }
}

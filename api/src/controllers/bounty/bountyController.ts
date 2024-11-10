import { NextFunction, Request, Response } from "express";
import BountyService from "../../services/bounty/bountyService";

class BountyController {
  private bountyService: BountyService;

  constructor() {
    //INITIALIZE SERVICES
    this.bountyService = new BountyService();

    //BINDING METHODS
    this.getBounties = this.getBounties.bind(this);
    this.getBountyById = this.getBountyById.bind(this);
    this.getBountyByCompanyId = this.getBountyByCompanyId.bind(this);
    this.createBounty = this.createBounty.bind(this);
    this.updateBounty = this.updateBounty.bind(this);
    this.deleteBounty = this.deleteBounty.bind(this);
    this.closeBounty = this.closeBounty.bind(this);
  }

  //GET BOUNTIES
  public async getBounties(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const bounties = await this.bountyService.getAllBounties();

      if (!bounties || bounties.length === 0) {
        return res.status(404).json({ message: "No bounties found" });
      }

      return res.status(200).json(bounties);
    } catch (error) {
      next(error);
    }
  }

  //GET BOUNTY BY ID
  public async getBountyById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const bounty = await this.bountyService.getBountyById(id);

      if (!bounty) {
        return res.status(404).json({ message: "Bounty not found" });
      }

      return res.status(200).json(bounty);
    } catch (error) {
      next(error);
    }
  }

  //GET BOUNTIES BY COMPANY ID (USER ID)
  public async getBountyByCompanyId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { userId } = req.params;
      const bounties = await this.bountyService.getBountyByCompanyId(userId);

      if (!bounties || bounties.length === 0) {
        return res.status(404).json({ message: "No bounties found" });
      }

      return res.status(200).json(bounties);
    } catch (error) {
      next(error);
    }
  }

  //CREATE BOUNTY
  public async createBounty(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const bountyData = req.body;
      const { userId } = req.params;

      const { message, bounty } = await this.bountyService.createBounty(
        bountyData,
        userId
      );

      return res.status(201).json({ message, bounty });
    } catch (error) {
      next(error);
    }
  }

  //UPDATE BOUNTY
  public async updateBounty(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { bountyId } = req.params;
      const bountyData = req.body;

      const { message, bounty } = await this.bountyService.updateBounty(
        bountyId,
        bountyData
      );

      return res.status(200).json({ message, bounty });
    } catch (error) {
      next(error);
    }
  }

  //DELETE BOUNTY
  public async deleteBounty(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { bountyId } = req.params;

      const { message } = await this.bountyService.deleteBounty(bountyId);

      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  //CLOSE BOUNTY
  public async closeBounty(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { bountyId } = req.params;

      const { message, bounty } = await this.bountyService.closeBounty(
        bountyId
      );

      return res.status(200).json({ message, bounty });
    } catch (error) {
      next(error);
    }
  }
}

const bountyController = new BountyController();
export default bountyController;

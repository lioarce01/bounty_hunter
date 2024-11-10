import { Bounty, BountyStatus } from "@prisma/client";
import prisma from "../../config/config";

class BountyService {
  //GET BOUNTIES
  async getAllBounties(): Promise<Bounty[] | null> {
    const bounties = await prisma.bounty.findMany();

    return bounties;
  }

  //GET BOUNTY BY ID
  async getBountyById(id: string): Promise<Bounty | null> {
    const bounty = await prisma.bounty.findUnique({ where: { id } });

    return bounty;
  }

  //GET BOUNTY BY COMPANY ID (USER ID)
  async getBountyByCompanyId(userId: string): Promise<Bounty[] | null> {
    const bounties = await prisma.bounty.findMany({
      where: {
        userId: userId,
      },
    });

    return bounties;
  }

  //CREATE BOUNTY
  async createBounty(
    bounty: Bounty,
    userId: string
  ): Promise<{ message: string; bounty: Bounty }> {
    const newBounty = await prisma.bounty.create({
      data: {
        title: bounty.title,
        description: bounty.description,
        reward: bounty.reward,
        status: BountyStatus.OPEN,
        company: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return {
      message: "Bounty created successfully",
      bounty: newBounty,
    };
  }

  //UPDATE BOUNTY
  async updateBounty(
    id: string,
    bounty: Bounty
  ): Promise<{ message: string; bounty: Bounty }> {
    const updatedBounty = await prisma.bounty.update({
      where: { id },
      data: {
        title: bounty.title,
        description: bounty.description,
        reward: bounty.reward,
      },
    });

    return {
      message: "Bounty updated successfully",
      bounty: updatedBounty,
    };
  }

  //DELETE BOUNTY
  async deleteBounty(id: string): Promise<{ message: string }> {
    const deletedBounty = await prisma.bounty.delete({ where: { id } });

    return {
      message: "Bounty deleted successfully",
    };
  }

  //CLOSE BOUNTY
  async closeBounty(id: string): Promise<{ message: string; bounty: Bounty }> {
    const disabledBounty = await prisma.bounty.update({
      where: { id },
      data: {
        status: BountyStatus.CLOSED,
      },
    });

    return {
      message: "Bounty closed successfully",
      bounty: disabledBounty,
    };
  }
}

export default BountyService;

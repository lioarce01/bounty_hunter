import { Bounty, BountyStatus } from "@prisma/client";
import prisma from "../../config/config";

class BountyService {
  //GET BOUNTIES
  async getAllBounties() {
    const bounties = await prisma.bounty.findMany();

    return bounties;
  }

  //GET BOUNTY BY ID
  async getBountyById(id: string) {
    const bounty = await prisma.bounty.findUnique({ where: { id } });

    return bounty;
  }

  //GET BOUNTY BY COMPANY ID (USER ID)
  async getBountyByCompany(userId: string) {
    const bounties = await prisma.bounty.findMany({
      where: {
        userId: userId,
      },
    });

    return bounties;
  }

  //CREATE BOUNTY
  async createBounty(bounty: Bounty, userId: string) {
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

    return newBounty;
  }

  //UPDATE BOUNTY
  async updateBounty(id: string, bounty: Bounty) {
    const updatedBounty = await prisma.bounty.update({
      where: { id },
      data: {
        title: bounty.title,
        description: bounty.description,
        reward: bounty.reward,
      },
    });

    return updatedBounty;
  }

  //DELETE BOUNTY
  async deleteBounty(id: string) {
    const deletedBounty = await prisma.bounty.delete({ where: { id } });

    return deletedBounty;
  }

  //CLOSE BOUNTY
  async closeBounty(id: string) {
    const disabledBounty = await prisma.bounty.update({
      where: { id },
      data: {
        status: BountyStatus.CLOSED,
      },
    });

    return disabledBounty;
  }
}

const bountyService = new BountyService();
export default bountyService;

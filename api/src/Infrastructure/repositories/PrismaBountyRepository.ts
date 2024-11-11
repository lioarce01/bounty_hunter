import { BountyStatus, Role } from "@prisma/client";
import { Bounty } from "../../Domain/entities/Bounty";
import { BountyRepository } from "../../Domain/repositories/BountyRepository";
import prisma from "../../config/config";

export class PrismaBountyRepository implements BountyRepository {
  // GET ALL BOUNTIES
  async getAllBounties(): Promise<Bounty[]> {
    const bounties = await prisma.bounty.findMany();
    return bounties.map(
      (bounty) =>
        new Bounty(
          bounty.id,
          bounty.title,
          bounty.description,
          bounty.reward,
          bounty.status,
          bounty.userId,
          bounty.createdAt,
          bounty.updatedAt
        )
    );
  }

  // GET BOUNTY BY ID
  async getBountyById(id: string): Promise<Bounty | null> {
    const bounty = await prisma.bounty.findUnique({
      where: { id },
    });

    if (!bounty) return null;

    return new Bounty(
      bounty.id,
      bounty.title,
      bounty.description,
      bounty.reward,
      bounty.status,
      bounty.userId,
      bounty.createdAt,
      bounty.updatedAt
    );
  }

  // GET BOUNTY BY COMPANY ID (USER ID)
  async getBountyByCompanyId(userId: string): Promise<Bounty[] | null> {
    const bounties = await prisma.bounty.findMany({
      where: { userId },
    });

    if (!bounties || bounties.length === 0) return null;

    return bounties.map(
      (bounty) =>
        new Bounty(
          bounty.id,
          bounty.title,
          bounty.description,
          bounty.reward,
          bounty.status,
          bounty.userId,
          bounty.createdAt,
          bounty.updatedAt
        )
    );
  }

  // CREATE BOUNTY
  async createBounty(
    bountyData: Partial<Bounty>
  ): Promise<{ message: string; bounty: Bounty }> {
    if (
      !bountyData.title ||
      !bountyData.description ||
      !bountyData.reward ||
      !bountyData.userId
    ) {
      throw new Error("Missing required fields");
    }

    const user = await prisma.user.findUnique({
      where: { id: bountyData.userId },
      select: { role: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== Role.COMPANY) {
      throw new Error("Only companies can create bounties");
    }

    const newBounty = await prisma.bounty.create({
      data: {
        title: bountyData.title!,
        description: bountyData.description!,
        reward: bountyData.reward!,
        status: BountyStatus.OPEN,
        userId: bountyData.userId!,
      },
    });

    return {
      message: "Bounty created successfully",
      bounty: new Bounty(
        newBounty.id,
        newBounty.title,
        newBounty.description,
        newBounty.reward,
        newBounty.status,
        newBounty.userId,
        newBounty.createdAt,
        newBounty.updatedAt
      ),
    };
  }

  // UPDATE BOUNTY
  async updateBounty(
    id: string,
    bountyData: Partial<Bounty>
  ): Promise<{ message: string; bounty: Bounty }> {
    const updatedBounty = await prisma.bounty.update({
      where: { id },
      data: {
        title: bountyData.title!,
        description: bountyData.description!,
        reward: bountyData.reward!,
        status: bountyData.status || "OPEN",
      },
    });

    return {
      message: "Bounty updated successfully",
      bounty: new Bounty(
        updatedBounty.id,
        updatedBounty.title,
        updatedBounty.description,
        updatedBounty.reward,
        updatedBounty.status,
        updatedBounty.userId,
        updatedBounty.createdAt,
        updatedBounty.updatedAt
      ),
    };
  }

  // DELETE BOUNTY
  async deleteBounty(id: string): Promise<{ message: string }> {
    await prisma.bounty.delete({
      where: { id },
    });

    return {
      message: "Bounty deleted successfully",
    };
  }

  // CLOSE BOUNTY
  async closeBounty(id: string): Promise<Bounty> {
    const closedBounty = await prisma.bounty.update({
      where: { id },
      data: { status: BountyStatus.CLOSED },
    });

    return new Bounty(
      closedBounty.id,
      closedBounty.title,
      closedBounty.description,
      closedBounty.reward,
      closedBounty.status,
      closedBounty.userId,
      closedBounty.createdAt,
      closedBounty.updatedAt
    );
  }
}

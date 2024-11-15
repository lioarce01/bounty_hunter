import { BountyStatus, Role } from "@prisma/client";
import { Bounty } from "../../Domain/entities/Bounty";
import { BountyRepository } from "../../Domain/repositories/BountyRepository";
import prisma from "../../config/config";
import { injectable } from "tsyringe";
import { BountyFilter } from "../filters/BountyFilter";

@injectable()
export class PrismaBountyRepository implements BountyRepository {
  // GET ALL BOUNTIES
  async getAllBounties(
    filter?: BountyFilter,
    offset?: number,
    limit?: number
  ): Promise<Bounty[]> {
    const whereClause = filter ? filter.buildWhereClause() : {};
    const orderByClause = filter ? filter.buildOrderByClause() : {};
    const bounties = await prisma.bounty.findMany({
      where: whereClause,
      orderBy: orderByClause,
      ...(typeof offset !== "undefined" && { skip: offset }),
      ...(typeof limit !== "undefined" && { take: limit }),
      include: {
        reports: {
          select: {
            id: true,
          },
        },
      },
    });
    return bounties.map(
      (bounty) =>
        new Bounty(
          bounty.id,
          bounty.title,
          bounty.description,
          bounty.reward,
          bounty.status,
          bounty.category,
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
      include: {
        company: true,
        reports: true,
      },
    });

    if (!bounty) return null;

    return new Bounty(
      bounty.id,
      bounty.title,
      bounty.description,
      bounty.reward,
      bounty.status,
      bounty.category,
      bounty.userId,
      bounty.createdAt,
      bounty.updatedAt,
      bounty.company,
      bounty.reports
    );
  }

  // GET BOUNTY BY COMPANY ID (USER ID)
  async getBountyByCompanyId(
    userId: string,
    filter?: BountyFilter,
    offset?: number,
    limit?: number
  ): Promise<Bounty[] | null> {
    const whereClause = filter ? filter.buildWhereClause() : {};
    const bounties = await prisma.bounty.findMany({
      where: {
        userId,
        ...whereClause,
      },
      ...(typeof offset !== "undefined" && { skip: offset }),
      ...(typeof limit !== "undefined" && { take: limit }),
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
          bounty.category,
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
      !bountyData.userId ||
      !bountyData.category
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
        category: bountyData.category!,
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
        newBounty.category,
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
        updatedBounty.category,
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
      closedBounty.category,
      closedBounty.userId,
      closedBounty.createdAt,
      closedBounty.updatedAt
    );
  }
}

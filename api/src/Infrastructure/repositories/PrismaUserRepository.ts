import { Prisma, Role, UserStatus } from "@prisma/client";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import { User } from "../../Domain/entities/User";
import prisma from "../../config/config";
import { injectable } from "tsyringe";

@injectable()
export class PrismaUserRepository implements UserRepository {
  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
      include: {
        bounties: {
          select: { id: true },
        },
        reports: {
          select: {
            id: true,
          },
        },
      },
    });
    return users.map(
      (user) =>
        new User(
          user.id,
          user.name,
          user.email,
          user.role,
          user.status,
          user.companyName ?? null,
          user.companyDescription ?? null,
          user.companyURL ?? null,
          user.bounties ?? [],
          user.reports ?? []
        )
    );
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { bounties: true, reports: true },
    });
    if (!user) return null;
    return new User(
      user.id,
      user.name,
      user.email,
      user.role,
      user.status,
      user.companyName ?? null,
      user.companyDescription ?? null,
      user.companyURL ?? null,
      user.bounties ?? [],
      user.reports ?? []
    );
  }

  async createUser(
    user: Prisma.UserCreateInput
  ): Promise<{ message: string; user: User }> {
    const newUser = await prisma.user.create({
      data: user,
    });

    const userEntity = new User(
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.role,
      newUser.status,
      newUser.companyName ?? null,
      newUser.companyDescription ?? null,
      newUser.companyURL ?? null
    );

    return {
      message: "User created successfully",
      user: userEntity,
    };
  }

  async updateUser(
    id: string,
    user: Prisma.UserUpdateInput
  ): Promise<{ message: string; user: User }> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: user,
    });

    const userEntity = new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
      updatedUser.role,
      updatedUser.status,
      updatedUser.companyName ?? null,
      updatedUser.companyDescription ?? null,
      updatedUser.companyURL ?? null
    );

    return {
      message: "User updated successfully",
      user: userEntity,
    };
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    await prisma.user.delete({ where: { id } });

    return {
      message: "User deleted successfully",
    };
  }

  async disableUser(id: string): Promise<{ message: string }> {
    const disabledUser = await prisma.user.update({
      where: { id },
      data: {
        status: UserStatus.DISABLED,
      },
    });
    return {
      message: "User disabled successfully",
    };
  }

  async switchRole(id: string): Promise<{ message: string }> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { role: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const newRole = user.role === Role.COMPANY ? Role.HUNTER : Role.COMPANY;

    await prisma.user.update({
      where: { id },
      data: {
        role: newRole,
      },
    });

    return {
      message: "Role switched successfully",
    };
  }
}

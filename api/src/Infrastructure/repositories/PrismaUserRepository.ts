import { PrismaClient, Prisma, UserStatus, Role } from "@prisma/client";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import { User } from "../../Domain/entities/User";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
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
          user.companyURL ?? null
        )
    );
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(
      user.id,
      user.name,
      user.email,
      user.role,
      user.status,
      user.companyName ?? null,
      user.companyDescription ?? null,
      user.companyURL ?? null
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

  async disableUser(id: string): Promise<User> {
    const disabledUser = await prisma.user.update({
      where: { id },
      data: { status: UserStatus.DISABLED },
    });
    return new User(
      disabledUser.id,
      disabledUser.name,
      disabledUser.email,
      disabledUser.role,
      disabledUser.status,
      disabledUser.companyName ?? null,
      disabledUser.companyDescription ?? null,
      disabledUser.companyURL ?? null
    );
  }
}

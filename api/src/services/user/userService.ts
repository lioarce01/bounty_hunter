import { User, UserStatus } from "@prisma/client";
import prisma from "../../config/config";

class UserService {
  //GET USERS
  async getAllUsers(): Promise<User[] | null> {
    const users = await prisma.user.findMany();

    return users;
  }

  //GET USER BY ID
  async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }

  //CREATE USER
  async createUser(user: any): Promise<{ message: string; user: User }> {
    const newUser = await prisma.user.create({
      data: user,
    });

    return {
      message: "User created successfully",
      user: newUser,
    };
  }

  //UPDATE USER
  async updateUser(
    id: string,
    user: any
  ): Promise<{ message: string; user: User }> {
    const updatedUser = await prisma.user.update({ where: { id }, data: user });

    return {
      message: "User updated successfully",
      user: updatedUser,
    };
  }

  //DELETE USER
  async deleteUser(id: string): Promise<{ message: string }> {
    const deletedUser = await prisma.user.delete({ where: { id } });

    return {
      message: "User deleted successfully",
    };
  }

  //DISABLE USER
  async disableUser(id: string): Promise<{ message: string; user: User }> {
    const disabledUser = await prisma.user.update({
      where: { id },
      data: {
        status: UserStatus.DISABLED,
      },
    });

    return {
      message: "User disabled successfully",
      user: disabledUser,
    };
  }
}

export default UserService;

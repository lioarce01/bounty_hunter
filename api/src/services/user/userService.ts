import { User, UserStatus } from "@prisma/client";
import prisma from "../../config/config";

class UserService {
  //GET USERS
  async getAllUsers() {
    const users = await prisma.user.findMany();

    return users;
  }

  //GET USER BY ID
  async getUserById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }

  //CREATE USER
  async createUser(user: User) {
    const newUser = await prisma.user.create({
      data: user,
    });

    return newUser;
  }

  //UPDATE USER
  async updateUser(id: string, user: User) {
    const updatedUser = await prisma.user.update({ where: { id }, data: user });

    return updatedUser;
  }

  //DELETE USER
  async deleteUser(id: string) {
    const deletedUser = await prisma.user.delete({ where: { id } });

    return deletedUser;
  }

  //DISABLE USER
  async disableUser(id: string) {
    const disabledUser = await prisma.user.update({
      where: { id },
      data: {
        status: UserStatus.DISABLED,
      },
    });

    return disabledUser;
  }
}

const userService = new UserService();
export default userService;

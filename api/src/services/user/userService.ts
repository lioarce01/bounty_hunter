import prisma from "../../config/config";

class UserService {
  async getAllUsers() {
    const users = await prisma.user.findMany();

    return users;
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }

  async createUser(user: any) {
    const newUser = await prisma.user.create({
      data: user,
    });

    return newUser;
  }

  async updateUser(id: string, user: any) {
    const updatedUser = await prisma.user.update({ where: { id }, data: user });

    return updatedUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await prisma.user.delete({ where: { id } });

    return deletedUser;
  }
}

const userService = new UserService();
export default userService;

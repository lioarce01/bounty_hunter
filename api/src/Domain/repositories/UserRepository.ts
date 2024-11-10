import { User, Prisma } from "@prisma/client";

export interface UserRepository {
  getAllUsers(): Promise<User[] | null>;
  getUserById(id: string): Promise<User | null>;
  createUser(
    user: Prisma.UserCreateInput
  ): Promise<{ message: string; user: User }>;
  updateUser(
    id: string,
    user: Prisma.UserUpdateInput
  ): Promise<{ message: string; user: User }>;
  deleteUser(id: string): Promise<{ message: string }>;
  disableUser(id: string): Promise<User>;
}

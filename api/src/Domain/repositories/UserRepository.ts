import { User, Prisma } from "@prisma/client";
import { UserFilter } from "../../Infrastructure/filters/UserFilter";

export interface UserRepository {
  getAllUsers(
    filter?: UserFilter,
    offset?: number,
    limit?: number
  ): Promise<User[] | null>;
  getUserById(id: string): Promise<User | null>;
  createUser(
    user: Prisma.UserCreateInput
  ): Promise<{ message: string; user: User }>;
  updateUser(
    id: string,
    user: Prisma.UserUpdateInput
  ): Promise<{ message: string; user: User }>;
  deleteUser(id: string): Promise<{ message: string }>;
  disableUser(id: string): Promise<{ message: string }>;
  switchRole(id: string): Promise<{ message: string }>;
}

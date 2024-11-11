import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { CreateUser } from "../../Application/use-cases/user/CreateUser";
import { GetAllUsers } from "../../Application/use-cases/user/GetAllUsers";
import { GetUserById } from "../../Application/use-cases/user/GetUserById";
import { DeleteUser } from "../../Application/use-cases/user/DeleteUser";
import { DisableUser } from "../../Application/use-cases/user/DisableUser";
import { UpdateUser } from "../../Application/use-cases/user/UpdateUser";
import { SwitchRole } from "../../Application/use-cases/user/SwitchRole";

export function setupContainer() {
  container.registerSingleton<UserRepository>(
    "UserRepository",
    PrismaUserRepository
  );

  container.registerSingleton("CreateUser", CreateUser);
  container.registerSingleton("GetAllUsers", GetAllUsers);
  container.registerSingleton("GetUserById", GetUserById);
  container.registerSingleton("DeleteUser", DeleteUser);
  container.registerSingleton("DisableUser", DisableUser);
  container.registerSingleton("UpdateUser", UpdateUser);
  container.registerSingleton("SwitchRole", SwitchRole);
}

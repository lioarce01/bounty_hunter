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
import { BountyRepository } from "../../Domain/repositories/BountyRepository";
import { PrismaBountyRepository } from "../repositories/PrismaBountyRepository";
import { GetAllBounties } from "../../Application/use-cases/bounty/GetAllBounties";
import { GetBountyById } from "../../Application/use-cases/bounty/GetBountyById";
import { GetBountyByCompanyId } from "../../Application/use-cases/bounty/GetBountyByCompanyId";
import { CreateBounty } from "../../Application/use-cases/bounty/CreateBounty";
import { UpdateBounty } from "../../Application/use-cases/bounty/UpdateBounty";
import { DeleteBounty } from "../../Application/use-cases/bounty/DeleteBounty";
import { CloseBounty } from "../../Application/use-cases/bounty/CloseBounty";

export function setupContainer() {
  //REGISTER USER REPOSITORY
  container.registerSingleton<UserRepository>(
    "UserRepository",
    PrismaUserRepository
  );

  //REGISTER BOUNTY REPOSITORY
  container.registerSingleton<BountyRepository>(
    "BountyRepository",
    PrismaBountyRepository
  );

  //REGISTER USE CASES FOR USERS
  container.registerSingleton("CreateUser", CreateUser);
  container.registerSingleton("GetAllUsers", GetAllUsers);
  container.registerSingleton("GetUserById", GetUserById);
  container.registerSingleton("DeleteUser", DeleteUser);
  container.registerSingleton("DisableUser", DisableUser);
  container.registerSingleton("UpdateUser", UpdateUser);
  container.registerSingleton("SwitchRole", SwitchRole);

  //REGISTER USE CASES FOR BOUNTIES
  container.registerSingleton("GetAllBounties", GetAllBounties);
  container.registerSingleton("GetBountyById", GetBountyById);
  container.registerSingleton("GetBountyByCompanyId", GetBountyByCompanyId);
  container.registerSingleton("CreateBounty", CreateBounty);
  container.registerSingleton("UpdateBounty", UpdateBounty);
  container.registerSingleton("DeleteBounty", DeleteBounty);
  container.registerSingleton("CloseBounty", CloseBounty);
}

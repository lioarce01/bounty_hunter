import { Request, Response } from "express";
import { CreateUser } from "../../../Application/use-cases/user/CreateUser";
import { GetFilteredUsers } from "../../../Application/use-cases/user/GetAllUsers";
import { DeleteUser } from "../../../Application/use-cases/user/DeleteUser";
import { DisableUser } from "../../../Application/use-cases/user/DisableUser";
import { GetUserById } from "../../../Application/use-cases/user/GetUserById";
import { UpdateUser } from "../../../Application/use-cases/user/UpdateUser";
import { SwitchRole } from "../../../Application/use-cases/user/SwitchRole";
import { inject, injectable } from "tsyringe";
import { Role, UserStatus } from "@prisma/client";

@injectable()
export class UserController {
  constructor(
    @inject(CreateUser) private createUserUseCase: CreateUser,
    @inject(GetUserById) private getUserByIdUseCase: GetUserById,
    @inject(DeleteUser) private deleteUserUseCase: DeleteUser,
    @inject(DisableUser) private disableUserUseCase: DisableUser,
    @inject(UpdateUser) private updateUserUseCase: UpdateUser,
    @inject(SwitchRole) private switchRoleUseCase: SwitchRole,
    @inject(GetFilteredUsers) private getFilteredUsersUseCase: GetFilteredUsers
  ) {}

  async getAllUsers(req: Request, res: Response) {
    const { role, status } = req.query;
    const filters = {
      role: role as Role,
      status: status as UserStatus,
    };
    const users = await this.getFilteredUsersUseCase.execute(filters);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  }

  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;

    const user = await this.createUserUseCase.execute({ name, email });
    res.status(201).json(user);
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const { message } = await this.deleteUserUseCase.execute(id);

    res.status(200).json({ message });
  }

  async disableUser(req: Request, res: Response) {
    const { id } = req.params;

    const { message } = await this.disableUserUseCase.execute(id);

    res.status(200).json({ message });
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this.getUserByIdUseCase.execute(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const userData = req.body;

    const { message, user } = await this.updateUserUseCase.execute(
      id,
      userData
    );

    res.status(200).json({ message, user });
  }

  async switchRole(req: Request, res: Response) {
    const { id } = req.params;

    const { message } = await this.switchRoleUseCase.execute(id);

    res.status(200).json({ message });
  }
}

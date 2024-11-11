import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/PrismaUserRepository";
import { CreateUser } from "../../../Application/use-cases/user/CreateUser";
import { GetAllUsers } from "../../../Application/use-cases/user/GetAllUsers";
import { DeleteUser } from "../../../Application/use-cases/user/DeleteUser";
import { DisableUser } from "../../../Application/use-cases/user/DisableUser";
import { GetUserById } from "../../../Application/use-cases/user/GetUserById";
import { UpdateUser } from "../../../Application/use-cases/user/UpdateUser";
import { SwitchRole } from "../../../Application/use-cases/user/SwitchRole";

const userRepository = new PrismaUserRepository();

const createUserUseCase = new CreateUser(userRepository);
const getAllUsersUseCase = new GetAllUsers(userRepository);
const deleteUserUseCase = new DeleteUser(userRepository);
const disableUserUseCase = new DisableUser(userRepository);
const getUserByIdUseCase = new GetUserById(userRepository);
const updateUserUseCase = new UpdateUser(userRepository);
const switchRoleUseCase = new SwitchRole(userRepository);

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    const users = await getAllUsersUseCase.execute();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  }

  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    const user = await createUserUseCase.execute({ name, email });
    res.status(201).json(user);
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const { message } = await deleteUserUseCase.execute(id);

    res.status(200).json({ message });
  }

  async disableUser(req: Request, res: Response) {
    const { id } = req.params;

    const { message } = await disableUserUseCase.execute(id);

    res.status(200).json({ message });
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await getUserByIdUseCase.execute(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const userData = req.body;

    const { message, user } = await updateUserUseCase.execute(id, userData);

    res.status(200).json({ message, user });
  }

  async switchRole(req: Request, res: Response) {
    const { id } = req.params;

    const { message } = await switchRoleUseCase.execute(id);

    res.status(200).json({ message });
  }
}

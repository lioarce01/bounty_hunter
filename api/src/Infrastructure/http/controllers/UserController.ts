import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/PrismaUserRepository";
import { CreateUser } from "../../../Application/use-cases/user/CreateUser";

const userRepository = new PrismaUserRepository();
const createUserUseCase = new CreateUser(userRepository);

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    const users = await userRepository.getAllUsers();

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
}

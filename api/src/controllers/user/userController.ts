import { NextFunction, Request, Response } from "express";
import UserService from "../../services/user/userService";

class UserController {
  private userService: UserService;

  constructor() {
    //INITIALIZE SERVICES
    this.userService = new UserService();

    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.disableUser = this.disableUser.bind(this);
  }

  //GET ALL USERS
  public async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const users = await this.userService.getAllUsers();

      if (!users || users.length === 0) {
        return res.status(404).json({ message: "Users not found" });
      }

      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  //GET USER BY ID
  public async getUserById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const user = await this.userService.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  //CREATE USER
  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const { message, user } = await this.userService.createUser({
        name,
        email,
      });

      res.status(201).json({ message, user });
    } catch (error) {
      next(error);
    }
  }

  //UPDATE USER
  public async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { id } = req.params;
    const userData = req.body;

    try {
      const { message, user } = await this.userService.updateUser(id, userData);

      res.status(200).json({ message, user });
    } catch (error) {
      next(error);
    }
  }

  //DELETE USER
  public async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const { message } = await this.userService.deleteUser(id);

      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }

  //DISABLE USER
  public async disableUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;

      const { message, user } = await this.userService.disableUser(id);

      return res.status(200).json({ message, user });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;

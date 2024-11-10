import { NextFunction, Request, Response } from "express";
import userService from "../../services/user/userService";

class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();

      if (!users || users.length === 0) {
        return res.status(404).json({ message: "Users not found", users });
      }

      res.status(200).json({ message: "Users found", users });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found", user: null });
      }

      res.status(200).json({ message: "User found", user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const newUser = await userService.createUser({
        name,
        email,
      });

      res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, companyName, companyDescription, companyURL } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const updatedUser = await userService.updateUser(id, {
        name,
        companyName,
        companyDescription,
        companyURL,
      });

      res.status(200).json({ message: "User updated", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      await userService.deleteUser(id);

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;

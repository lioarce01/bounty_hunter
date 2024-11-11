import "reflect-metadata";
import express from "express";
import { container } from "tsyringe";
import { UserController } from "../controllers/UserController";
import { setupContainer } from "../../DI/DIContainer";

setupContainer();

const router = express.Router();

const userController = container.resolve(UserController);

router.get("/", (req, res) => userController.getAllUsers(req, res));
router.post("/", (req, res) => userController.createUser(req, res));
router.delete("/:id", (req, res) => userController.deleteUser(req, res));
router.put("/:id/disable", (req, res) => userController.disableUser(req, res));
router.get("/:id", (req, res) => userController.getUserById(req, res));
router.put("/:id/update", (req, res) => userController.updateUser(req, res));
router.put("/:id/switch-role", (req, res) =>
  userController.switchRole(req, res)
);

export default router;

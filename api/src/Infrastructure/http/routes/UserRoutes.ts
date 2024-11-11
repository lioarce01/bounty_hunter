import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id/disable", userController.disableUser);
router.get("/:id", userController.getUserById);
router.put("/:id/update", userController.updateUser);
router.put("/:id/switch-role", userController.switchRole);

export default router;

import { Request, Response, Router } from "express";
import {
  getUser,
  getUsers,
  patchUser,
  postUser,
  removeUser,
  restoreUser,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/getUsers/", getUsers);
userRoutes.get("/getUser/:id", getUser);
userRoutes.post("/createUser/", postUser);
userRoutes.patch("/updateUser/:id", patchUser);
userRoutes.delete("/removeUser/:id", removeUser);
userRoutes.delete("/restoreUser/:id", restoreUser);

export { userRoutes };

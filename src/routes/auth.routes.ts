import { Router } from "express";
import { changePassword, login, recoverPassword } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/changePassword/", changePassword);
authRoutes.post("/login/", login);
authRoutes.post("/recover/", recoverPassword);

export { authRoutes};

import { Router } from "express";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";
import { departmentRoutes } from "./department.routes";

const appRouter = Router()

appRouter.use('/user', userRoutes)
appRouter.use('/auth', authRoutes)
appRouter.use('/department', departmentRoutes)

export { appRouter }
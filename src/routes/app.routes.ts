import { Router } from "express";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";
import { departmentRoutes } from "./department.routes";
import { specialityRoutes } from "./speciality.routes";
import { staffRoutes } from "./staff.routes";

const appRouter = Router()

appRouter.use('/user', userRoutes)
appRouter.use('/auth', authRoutes)
appRouter.use('/department', departmentRoutes)
appRouter.use('/speciality', specialityRoutes)
appRouter.use('/staff', staffRoutes)

export { appRouter }
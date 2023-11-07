import { Router } from "express";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";
import { departmentRoutes } from "./department.routes";
import { specialityRoutes } from "./speciality.routes";
import { staffRoutes } from "./staff.routes";
import { illnessRoutes } from "./illness.routes";
import { attentionRoutes } from "./attention.routes";
import { roomRoutes } from "./room.routes";

const appRouter = Router()

appRouter.use('/user', userRoutes)
appRouter.use('/auth', authRoutes)
appRouter.use('/department', departmentRoutes)
appRouter.use('/illness', illnessRoutes)
appRouter.use('/speciality', specialityRoutes)
appRouter.use('/staff', staffRoutes)
appRouter.use('/attention', attentionRoutes)
appRouter.use('/room', roomRoutes)

export { appRouter }
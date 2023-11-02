import { Router } from "express";
import {
  getDeparments,
  getDepartment,
  patchDepartment,
  postDepartment,
  removeDepartment,
  restoreDepartment,
} from "../controllers/department.controller";

const departmentRoutes = Router();

departmentRoutes.get("/getDepartments/", getDeparments);
departmentRoutes.get("/getDepartment/:id", getDepartment);
departmentRoutes.post("/createDepartment/", postDepartment);
departmentRoutes.patch("/updateDepartment/:id", patchDepartment);
departmentRoutes.delete("/removeDepartment/:id", removeDepartment);
departmentRoutes.delete("/restoreDepartment/:id", restoreDepartment);

export { departmentRoutes };

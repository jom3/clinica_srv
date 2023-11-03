import { Router } from "express";
import {
  getStaff,
  getStaffs,
  patchStaff,
  postStaff,
  removeStaff,
  restoreStaff,
} from "../controllers/staff.controller";

const staffRoutes = Router();

staffRoutes.get("/getStaffs/", getStaffs);
staffRoutes.get("/getStaff/:id", getStaff);
staffRoutes.post("/createStaff/", postStaff);
staffRoutes.patch("/updateStaff/:id", patchStaff);
staffRoutes.delete("/removeStaff/:id", removeStaff);
staffRoutes.delete("/restoreStaff/:id", restoreStaff);

export { staffRoutes };

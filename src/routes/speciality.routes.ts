import { Router } from "express";
import {
  getSpecialities,
  getSpeciality,
  patchSpeciality,
  postSpeciality,
  removeSpeciality,
  restoreSpeciality,
} from "../controllers/speciality.controller";

const specialityRoutes = Router();

specialityRoutes.get("/getSpecialities/", getSpecialities);
specialityRoutes.get("/getSpeciality/:id", getSpeciality);
specialityRoutes.post("/createSpeciality/", postSpeciality);
specialityRoutes.patch("/updateSpeciality/:id", patchSpeciality);
specialityRoutes.delete("/removeSpeciality/:id", removeSpeciality);
specialityRoutes.delete("/restoreSpeciality/:id", restoreSpeciality);

export { specialityRoutes };

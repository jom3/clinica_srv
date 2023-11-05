import { Router } from "express";
import {
  getIllness,
  getOneIllness,
  patchIllness,
  postIllness,
  removeIllness,
  restoreIllness,
} from "../controllers/illness.controller";

const illnessRoutes = Router();

illnessRoutes.get("/getIllness/", getIllness);
illnessRoutes.get("/getIllness/:id", getOneIllness);
illnessRoutes.post("/createIllness/", postIllness);
illnessRoutes.patch("/updateIllness/:id", patchIllness);
illnessRoutes.delete("/removeIllness/:id", removeIllness);
illnessRoutes.delete("/restoreIllness/:id", restoreIllness);

export { illnessRoutes };

import { Router } from "express";
import {
  getRoom,
  getRooms,
  patchRoom,
  postRoom,
  removeRoom,
  restoreRoom,
} from "../controllers/room.controller";

const roomRoutes = Router();

roomRoutes.get("/getRooms/", getRooms);
roomRoutes.get("/getRoom/:id", getRoom);
roomRoutes.post("/createRoom/", postRoom);
roomRoutes.patch("/updateRoom/:id", patchRoom);
roomRoutes.delete("/removeRoom/:id", removeRoom);
roomRoutes.delete("/restoreRoom/:id", restoreRoom);

export { roomRoutes };

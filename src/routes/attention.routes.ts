import { Router } from "express";
import {
  getAttention,
  getAttentions,
  patchAttention,
  postAttention,
  removeAttention,
  restoreAttention,
  serveAttention,
} from "../controllers/attention.controller";

const attentionRoutes = Router();

attentionRoutes.get("/getAttentions/", getAttentions);
attentionRoutes.get("/getAttention/:id", getAttention);
attentionRoutes.post("/createAttention/", postAttention);
attentionRoutes.patch("/updateAttention/:id", patchAttention);
attentionRoutes.delete("/removeAttention/:id", removeAttention);
attentionRoutes.delete("/restoreAttention/:id", restoreAttention);
attentionRoutes.delete("/serveAttention/:id", serveAttention);

export { attentionRoutes };

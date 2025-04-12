
import { Router } from "express";
import AreasController from "../controllers/AreasController.js";

const router = Router();

router.get("/", AreasController.index);
router.get("/:id", AreasController.show);
router.post("/", AreasController.store);
router.put("/:id", AreasController.update);
router.delete("/:id", AreasController.destroy);

export default router;

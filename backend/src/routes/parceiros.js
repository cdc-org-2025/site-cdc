
import { Router } from "express";
import ParceirosController from "../controllers/ParceirosController.js";

const router = Router();

router.get("/", ParceirosController.index);

export default router;

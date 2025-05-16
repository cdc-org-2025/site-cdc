
import { Router } from "express";
import CardInformativo from "../controllers/CardInformativoController.js";

const router = Router();

router.get("/", CardInformativo.index);

export default router;

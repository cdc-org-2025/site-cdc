
import { Router } from "express";
import BannerController from "../controllers/Banners.js";

const router = Router();

router.get("/", BannerController.index);

export default router;

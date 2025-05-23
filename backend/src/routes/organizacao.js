
import { Router } from "express";
import OrganizacaoController from "../controllers/OrganizacaoController.js";

const router = Router();

router.get("/", OrganizacaoController.index);

export default router
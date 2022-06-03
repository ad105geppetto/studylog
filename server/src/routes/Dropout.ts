import express from "express";
import controller from "../controllers/Dropout";
const router = express.Router();

router.delete("/", controller.delete);

export default router;

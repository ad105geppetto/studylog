import express from "express";
import controller from "../controllers/Check";
const router = express.Router();

router.post("/", controller.post);
export default router;

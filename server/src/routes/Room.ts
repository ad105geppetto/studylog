import express from "express";
import controller from "../controllers/Room";
const router = express.Router();

router.post("/", controller.post);
router.patch("/", controller.patch);
export default router;

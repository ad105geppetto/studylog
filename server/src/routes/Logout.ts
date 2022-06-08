import express from "express";
import controller from "../controllers/Logout";
const router = express.Router();

router.get("/", controller.get);
export default router;

import express from "express"
import controller from "../controllers/KakaoOauth"
const router = express.Router();

router.get("/", controller.get)
export default router
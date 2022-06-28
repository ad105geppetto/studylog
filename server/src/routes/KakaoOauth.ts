import express from "express"
import controller from "../controllers/KakaoOauth"
const router = express.Router();

router.get("/", controller.get)
router.post("/redirect", controller.redirect)
export default router
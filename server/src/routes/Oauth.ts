import express from "express"
import controller from "../controllers/Oauth"
const router = express.Router();

router.post("/", controller.post);
export default router;
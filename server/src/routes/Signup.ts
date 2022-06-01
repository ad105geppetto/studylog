import express from "express"
import controller from "../controllers/Signup"
const router = express.Router();

router.post("/", controller.post);
export default router;
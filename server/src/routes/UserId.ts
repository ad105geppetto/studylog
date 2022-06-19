import express from "express"
import controller from "../controllers/UserId"
const router = express.Router();

router.post("/", controller.post);
export default router;
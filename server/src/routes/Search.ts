import express from "express"
import controller from "../controllers/Search.ts"
const router = express.Router();

router.get("/", controller.get);
export default router;
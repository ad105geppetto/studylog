import express from "express"
import controller from "../controllers/Search"
const router = express.Router();

router.get("/", controller.get);
export default router;
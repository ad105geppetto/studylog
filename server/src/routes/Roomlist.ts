import express from "express"
import controller from "../controllers/Roomlist"
const router = express.Router();

router.get("/", controller.get);
router.delete("/", controller.delete);
export default router;
import express from "express"
import controller from "../controllers/Roomlist"
const router = express.Router();

router.get("/", controller.get);
router.post("/", controller.post);
router.put("/", controller.put);
router.delete("/", controller.delete);
export default router;
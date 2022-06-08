import express from "express";
import controller from "../controllers/Todo";
const router = express.Router();

router.get("/", controller.get);
router.post("/", controller.post);
router.patch("/:id", controller.patch);
router.delete("/:id", controller.delete);

export default router;

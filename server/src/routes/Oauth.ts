import express = require("express");
import controller from "../controllers/Oauth"
const router = express.Router();

router.get("/", controller.get);
router.post("/", controller.post);
router.put("/", controller.put);
router.delete("/", controller.delete);
export default router;
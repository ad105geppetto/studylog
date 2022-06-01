import express = require("express");
import controller from "../controllers/FindPwdMailing"
const router = express.Router();

router.post("/", controller.post);
export default router;
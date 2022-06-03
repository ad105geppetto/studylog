import express from "express";
import loginRouter from "./Login";
////////////////////////////////////////////////////
import logoutRouter from "./Logout";
import dropoutRouter from "./Dropout";

////////////////////////////////////////////////////
const router = express.Router();

router.use("/login", loginRouter);
///////////////////////////////////////////////////
router.use("/logout", logoutRouter);
///////////////////////////////////////////////////
router.use("/dropout", dropoutRouter);

export default router;

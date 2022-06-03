import express from "express";
import loginRouter from "./Login";
import logoutRouter from "./Logout";
import dropoutRouter from "./Dropout";
import userinfoRouter from "./Userinfo";
import signupRouter from "./Signup";

const router = express.Router();

router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/dropout", dropoutRouter);
router.use("/userinfo", userinfoRouter);
router.use("/signup", signupRouter);

export default router;

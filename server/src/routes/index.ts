import express from "express";
import loginRouter from "./Login";
import signupRouter from "./Signup";
import findPwdMailingRouter from "./FindPwdMailing";
import checkRouter from "./Check";
import userIdRouter from "./UserId";
import userpwdRouter from "./Userpwd";
import oauthRouter from "./Oauth";
import roomlistRouter from "./Roomlist";
import logoutRouter from "./Logout";
import dropoutRouter from "./Dropout";
import userinfoRouter from "./Userinfo";

const router = express.Router();

router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/dropout", dropoutRouter);
router.use("/userinfo", userinfoRouter);
router.use("/signup", signupRouter);
router.use("/userpwd/auth", findPwdMailingRouter);
router.use("/check", checkRouter);
router.use("/userid", userIdRouter);
router.use("/userpwd", userpwdRouter);
router.use("/Oauth", oauthRouter);
router.use("/roomlist", roomlistRouter);

export default router;

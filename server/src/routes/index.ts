import express from "express";
import loginRouter from "./Login";
import signupRouter from "./Signup";
import findPwdMailingRouter from "./FindPwdMailing";
import checkRouter from "./Check";
import userIdRouter from "./UserId";
import userpwdRouter from "./Userpwd";
import oauthRouter from "./Oauth";
import roomlistRouter from "./Roomlist";
////////////////////////////////////////////////////

import userinfoRouter from "./Userinfo";

////////////////////////////////////////////////////
const router = express.Router();

router.use("/login", loginRouter);
router.use("/signup", signupRouter);
router.use("/findPwdMailing", findPwdMailingRouter);
router.use("/check", checkRouter);
router.use("/userid", userIdRouter);
router.use("/userpwd", userpwdRouter);
router.use("/userpwd/auth", oauthRouter);
router.use("/roomlist", roomlistRouter);
///////////////////////////////////////////////////

router.use("/userinfo", userinfoRouter);

// router.use("/signup", signupRouter);

export default router;

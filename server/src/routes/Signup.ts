import express from "express";
import controller from "../controllers/Signup";
const router = express.Router();

router.post("/", controller.post);

//회원가입/수정 메일인증하기에 대한 api
router.post("/mail", controller.mail);
//메일에서 인증하기 버튼에 대한 api
router.get("/auth", controller.auth);
export default router;

import express from "express";
import controller from "../controllers/Userinfo";
const router = express.Router();
/////////////////////////////////////////////////////////////
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    // 저장한공간 정보 : 하드디스크에 저장
    destination(req, file, done) {
      // 저장 위치
      done(null, "./public/"); // uploads라는 폴더 안에 저장
    },
    filename(req, file, done) {
      // 파일명을 어떤 이름으로 올릴지
      const ext = path.extname(file.originalname); // 파일의 확장자
      done(null, new Date().valueOf() + path.extname(file.originalname)); // 파일이름 + 날짜 + 확장자 이름으로 저장
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5메가로 용량 제한
});

/////////////////////////////////////////////////////////////

router.get("/", controller.get);
router.post("/", upload.single(`profile`), controller.post);
router.patch("/", upload.single(`profile`), controller.patch);
export default router;

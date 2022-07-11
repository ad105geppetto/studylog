import { Request, Response } from "express";

export default {
  // 로그아웃
  // accessToken을 null로 응답
  // 쿠키에 있는 리프레쉬 비움
  get: (req: Request, res: Response) => {
    if (req.headers["authorization"]) {
      res.clearCookie("refreshToken");
      res.send({ accessToken: null, message: "로그아웃되었습니다." });
    }
  },
};

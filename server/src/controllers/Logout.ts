import { Request, Response, NextFunction } from "express";

export default {
  get: (req: Request, res: Response, next: NextFunction) => {
    if (req.headers["authorization"]) {
      res.clearCookie("refreshToken");
      res.send({ accessToken: null, refreshToken: null, message: "로그아웃되었습니다." });
    }
  },
};

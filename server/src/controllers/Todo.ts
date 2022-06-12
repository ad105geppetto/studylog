import { Request, Response } from "express";
import models from "../models/Todo";
import jwt from "jsonwebtoken";

export default {
  //todo 목록불러오기
  get: (req: Request, res: Response) => {
    //토큰있는지 확인
    if (!req.headers.authorization) {
      res.status(404).send({ data: null, message: "로그인을 하세요." });
    } else {
      const authorization = req.headers["authorization"];
      const token = authorization.split(" ")[1];
      const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

      //토큰해독했는데 정보가 없는 경우
      if (!tokenData) {
        res.status(400).send({ data: null, message: "회원 정보가 없습니다." });
      } else {
        models.get(tokenData, (error, result) => {
          if (error) {
            res.status(500).send({ message: "서버에러" });
          } else {
            console.log(result);
            if (result.length === 0) {
              res.status(404).send({ message: "todo목록이 없습니다." });
            } else {
              let todos = result.map((ele) => {
                return {
                  id: ele.id,
                  type: ele.type,
                  content: ele.content,
                };
              });

              res.status(200).send({
                data: todos,
                total: todos.length,
              });
            }
          }
        });
      }
    }
  },
  //todo 생성
  post: (req: Request, res: Response) => {
    //바디로 내용 분류
    const { content, type } = req.body;

    if (!req.headers.authorization) {
      res.status(404).send({ data: null, message: "로그인을 하세요." });
    } else {
      const authorization = req.headers["authorization"];
      const token = authorization.split(" ")[1];
      const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

      //토큰해독했는데 정보가 없는 경우
      if (!tokenData) {
        res.status(400).send({ data: null, message: "회원 정보가 없습니다." });
      } else {
        models.post(content, type, tokenData, (error, result) => {
          if (error) {
            res.status(500).send({ message: "서버에러" });
          } else {
            if (result.length === 0) {
              res.status(404).send({ message: "todo목록이 없습니다." });
            } else {
              let todos = result.map((ele) => {
                return {
                  id: ele.id,
                  type: ele.type,
                  content: ele.content,
                };
              });

              res.status(200).send({
                data: todos,
                total: todos.length,
              });
            }
          }
        });
      }
    }
  },

  patch: (req: Request, res: Response) => {
    // 어떤 탭에 끌어왔는지 또는 내용이 바뀌었을 때
    const { id } = req.params;
    const { content, type } = req.body;

    // todo progres done에서 true가 여러개인경우 에러처리

    if (!req.headers.authorization) {
      res.status(404).send({ data: null, message: "로그인을 하세요." });
    } else {
      const authorization = req.headers["authorization"];
      const token = authorization.split(" ")[1];
      const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

      //토큰해독했는데 정보가 없는 경우
      if (!tokenData) {
        res.status(400).send({ data: null, message: "회원 정보가 없습니다." });
      } else {
        models.patch(id, content, type, tokenData, (error, result) => {
          if (error) {
            res.status(500).send({ message: "서버에러" });
          } else {
            if (result.length === 0) {
              res.status(404).send({ message: "todo목록이 없습니다." });
            } else {
              let todos = result.map((ele) => {
                return {
                  id: ele.id,
                  type: ele.type,
                  content: ele.content,
                };
              });

              res.status(200).send({
                data: todos,
                total: todos.length,
              });
            }
          }
        });
      }
    }
  },
  delete: (req: Request, res: Response) => {
    const { id } = req.params;

    if (!req.headers.authorization) {
      res.status(404).send({ data: null, message: "로그인을 하세요." });
    } else {
      const authorization = req.headers["authorization"];
      const token = authorization.split(" ")[1];
      const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

      //토큰해독했는데 정보가 없는 경우
      if (!tokenData) {
        res.status(400).send({ data: null, message: "회원 정보가 없습니다." });
      } else {
        models.delete(id, tokenData, (error, result) => {
          if (error) {
            res.status(500).send({ message: "서버에러" });
          } else {
            if (result.length === 0) {
              res.status(404).send({ message: "todo목록이 없습니다." });
            } else {
              let todos = result.map((ele) => {
                return {
                  id: ele.id,
                  type: ele.type,
                  content: ele.content,
                };
              });

              res.status(200).send({
                data: todos,
                total: todos.length,
              });
            }
          }
        });
      }
    }
  },
};

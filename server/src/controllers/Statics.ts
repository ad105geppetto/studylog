import { Request, Response } from "express";
import models from "../models/Statics";
import jwt from "jsonwebtoken";

export default {
  // 공부시간 데이터
  get: (req: Request, res: Response) => {
    if (!req.headers.authorization) {
      res.status(404).send({ data: null, message: "로그인을 하세요." });
    } else {
      const authorization = req.headers["authorization"];
      const token = authorization.split(" ")[1];
      const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

      models.get(tokenData, (error, result) => {
        if (error) {
          res.status(500).send({ message: "서버에러!" });
        } else {
          res.status(200).send({
            total: result[0].totalTime,
            mon: result[0].mon,
            tue: result[0].tue,
            wed: result[0].wed,
            thu: result[0].thu,
            fri: result[0].fri,
            sat: result[0].sat,
            sun: result[0].sun,
          });
        }
      });
    }
  },

  // 공부시간 기록
  post: async (req: Request, res: Response) => {
    if (!req.headers.authorization) {
      res.status(404).send({ data: null, message: "로그인을 하세요." });
    } else {
      const authorization = req.headers["authorization"];
      const token = authorization.split(" ")[1];
      const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

      //시작시간, 종료시간을 클라이언트에서 객체로 보내줌
      const { startObject, endObject } = req.body;

      //시작시간
      let start = new Date(
        startObject.year,
        startObject.month,
        startObject.date,
        startObject.hour,
        startObject.minute,
        startObject.second
      );

      //종료시간
      let end = new Date(
        endObject.year,
        endObject.month,
        endObject.date,
        endObject.hour,
        endObject.minute,
        endObject.second
      );

      //기준시간
      let criterion = new Date(startObject.year, startObject.month, startObject.date, 24, 0, 0);
      // console.log("기준시간", criterion);

      //요일변환함수
      function convertDay(day) {
        switch (day) {
          case 0:
            return "sun";

          case 1:
            return "mon";

          case 2:
            return "tue";

          case 3:
            return "wed";

          case 4:
            return "thu";

          case 5:
            return "fri";

          case 6:
            return "sat";
        }
      }

      // 요일이 변했는지체크 (gap이라는 변수로 체크)
      // 종료날과 시작날의 차이가 0이면 같은 날
      let gap = end.getDay() - start.getDay();
      if (gap === 0) {
        let day: string | number = convertDay(start.getDay());
        let time = Math.ceil((end.getTime() - start.getTime()) / 1000);

        // 같은날 공부하고 종료한 경우
        models.post1(day, time, tokenData, (error, result) => {
          if (error) {
            res.status(500).send({ message: "서버에러!" });
          } else {
            res.send({ message: "공부시간이 기록되었습니다." });
          }
        });
        // 종료날과 시작날의 차이가 1이면 12시 넘겼다는 의미
      } else if (gap === 1) {
        let today = convertDay(start.getDay());
        let todayTime = Math.ceil((criterion.getTime() - start.getTime()) / 1000);
        let NextDay = convertDay(end.getDay());
        let NextDayTime = Math.ceil(
          (end.getTime() - start.getTime() - (criterion.getTime() - start.getTime())) / 1000
        );

        // 다음날까지 공부하고 종료한 경우
        models.post2(today, NextDay, todayTime, NextDayTime, tokenData, (error, result) => {
          if (error) {
            res.status(500).send({ message: "서버에러!" });
          } else {
            res.send({ message: "공부시간이 기록되었습니다." });
          }
        });
      }
    }
  },
};

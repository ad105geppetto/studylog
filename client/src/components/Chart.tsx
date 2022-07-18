import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Legend,
  Bar,
} from "recharts";

import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #4b6587;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 70vh;
  width: 70vw;
  margin: 0;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
  }

  h1 {
    font-size: 3.5rem;
  }
  h2 {
    font-size: 2rem;
  }
`;

interface Chartinterface {
  userInfo: any;
}

const Chart = ({ userInfo }: Chartinterface) => {
  axios.defaults.withCredentials = true;
  const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

  const [weekSummary, setWeekSummary] = useState<any>("이번 주 공부 시간은 0 시간 입니다.");
  const [timeTable, setTimeTable] = useState([
    { name: "월", hour: 0 },
    { name: "화", hour: 0 },
    { name: "수", hour: 0 },
    { name: "목", hour: 0 },
    { name: "금", hour: 0 },
    { name: "토", hour: 0 },
    { name: "일", hour: 0 },
  ]);

  // ------- 데이터 불러오기 -----
  const onLoadingData = useCallback(() => {
    axios
      .get(`${SERVER}/statics`, { headers: { authorization: `Bearer ${userInfo.accessToken}` } })
      .then((res: AxiosResponse) => {
        const { mon, tue, wed, thu, fri, sat, sun, total } = res.data;

        function convertHour(dayTime: number) {
          let hour = (dayTime / 3600).toFixed(2);
          return Number(hour);
        }
        // 불러온 데이터를 상태에 저장해서 각 일자별로 데이터 세팅해주기
        setTimeTable([
          { name: "월", hour: convertHour(mon) },
          { name: "화", hour: convertHour(tue) },
          { name: "수", hour: convertHour(wed) },
          { name: "목", hour: convertHour(thu) },
          { name: "금", hour: convertHour(fri) },
          { name: "토", hour: convertHour(sat) },
          { name: "일", hour: convertHour(sun) },
        ]);

        // total 데이터 단위 변경 및 weekSummary 상태에 담아주기
        function returnTotalTime(total: number) {
          let hour = Math.floor(total / 3600);
          let minute = Math.floor((total % 3600) / 60);

          if (hour === 0) {
            return ` 이번 주 공부 시간은 ${minute} 분 입니다.`;
          } else {
            return `이번주 공부 시간은 ${hour}시간 ${minute}분 입니다.`;
          }
        }

        setWeekSummary(returnTotalTime(total));
      })
      .catch((err: AxiosError) => console.log(err));
  }, [SERVER, userInfo.accessToken]);

  useEffect(() => {
    onLoadingData();
  }, [onLoadingData]);

  return (
    <Wrapper>
      <h2 style={{ color: "white" }}> {weekSummary} </h2>
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer>
          <BarChart data={timeTable}>
            <CartesianGrid vertical={false} strokeDasharray="5" />
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="30%" stopColor="#F0E4CF" stopOpacity={1} />
                <stop offset="70%" stopColor="#ffffff" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <Legend />

            <Bar
              animationBegin={100}
              animationDuration={800}
              animationEasing={"ease-in-out"}
              legendType="none"
              maxBarSize={75}
              dataKey="hour"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  );
};

export default Chart;

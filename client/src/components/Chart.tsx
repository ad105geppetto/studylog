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

import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components";

axios.defaults.withCredentials = true;
const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

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
  const [weekSummary, setWeekSummary] = useState(0);
  const [timeTable, setTimeTable] = useState([
    { name: "월", 시간: 0 },
    { name: "화", 시간: 0 },
    { name: "수", 시간: 0 },
    { name: "목", 시간: 0 },
    { name: "금", 시간: 0 },
    { name: "토", 시간: 0 },
    { name: "일", 시간: 0 },
  ]);

  const onLoadingData = () => {
    axios
      .get(`${SERVER}/statics`, { headers: { authorization: `Bearer ${userInfo.accessToken}` } })
      .then((res: AxiosResponse) => {
        console.log(res);

        const { mon, tue, wed, thu, fri, sat, sun, total } = res.data;
        setTimeTable([
          { name: "월", 시간: mon },
          { name: "화", 시간: tue },
          { name: "수", 시간: wed },
          { name: "목", 시간: thu },
          { name: "금", 시간: fri },
          { name: "토", 시간: sat },
          { name: "일", 시간: sun },
        ]);

        setWeekSummary(total);

        /*
        요일별 데이터 불러오기,
        데이터 불러오고 난 후 각 일자별로 데이터 뿌리기, 
        */
      })
      .catch((err: AxiosError) => console.log(err));
  };

  useEffect(() => {
    onLoadingData();
  }, []);

  return (
    <Wrapper>
      <h2 style={{ color: "white" }}> 이번 주 나의 공부시간 {weekSummary} 시간 </h2>
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
              dataKey="시간"
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

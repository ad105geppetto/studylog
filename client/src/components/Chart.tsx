import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  Line,
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
  background: linear-gradient(to bottom, white, pink);
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
  const [data, setData] = useState([]);
  const [totalTime, setTotaltime] = useState(0);
  const [weekSummary, setWeekSummary] = useState(0);
  const dummyData = [
    { name: "월", 시간: 3 },
    { name: "화", 시간: 3.4 },
    { name: "수", 시간: 4 },
    { name: "목", 시간: 1 },
    { name: "금", 시간: 3.4 },
    { name: "토", 시간: 6 },
    { name: "일", 시간: 2 },
  ];

  const [studyTime, setStudyTime] = useState([
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
      <h1> 나는 {totalTime} 시간을 공부했습니다. </h1>

      <div style={{ width: "70%", height: "70%" }}>
        <ResponsiveContainer>
          <ComposedChart data={dummyData}>
            <CartesianGrid strokeDasharray="5 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="시간" fill="#8884d8" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <h2> 이번 주 나의 공부시간 {weekSummary} 시간 </h2>
    </Wrapper>
  );
};

export default Chart;

/*


axios.get 
`${SERVER}/statics`

 data:{totalTime:"totalTime", mon:"1", tue:"2", wed:"3", 
          thu:"4", fri:"5", sat:"6", sun:"7"}
}



        <LineChart
          width={600}
          height={300}
          data={dummyData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="시간" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
        
*/

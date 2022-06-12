import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { BarChart, Legend, Bar } from "recharts";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.withCredentials = true;
const SERVER = process.env.REACT_APP_SERVER;

interface Chartinterface {
  userInfo: any;
}

const Chart = ({ userInfo }: Chartinterface) => {
  const [data, setData] = useState([]);
  const [isLineGraph, setIsLineGraph] = useState(true);

  const dummyData = [
    { name: "월", 시간: 3 },
    { name: "화", 시간: 3.4 },
    { name: "수", 시간: 4 },
    { name: "목", 시간: 6 },
    { name: "금", 시간: 3.4 },
    { name: "토", 시간: 0 },
    { name: "일", 시간: 2 },
  ];

  const onSelectisLineGraph = () => {
    setIsLineGraph((isLineGraph) => !isLineGraph);
  };

  const onLoadingData = () => {
    axios
      .get(`${SERVER}/statics`, { headers: { authorization: `Bearer ${userInfo.accessToken}` } })
      .then((res: AxiosResponse) => {
        setData([]);
      })
      .catch((err: AxiosError) => console.log(err));
  };

  useEffect(() => {
    onLoadingData();
  }, []);

  return (
    <div>
      <div> 나의 공부 시간 </div>

      {isLineGraph ? (
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
      ) : (
        <BarChart width={600} height={300} data={dummyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="시간" fill="#8884d8" />
        </BarChart>
      )}

      <button onClick={onSelectisLineGraph}> 그래프 변경 </button>
    </div>
  );
};

export default Chart;

/*


axios.get 
`${SERVER}/statics`

 data:{totalTime:"totalTime", mon:"1", tue:"2", wed:"3", 
          thu:"4", fri:"5", sat:"6", sun:"7"}
}

*/

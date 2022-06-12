import Chart from "components/Chart";
import Boards from "components/Boards";
import { useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
// 로그인시 저장 된 userInfo 가지고 오기

const Todo = () => {
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);

  const [rendering, setRendering] = useState("Board");

  const onRenderTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRendering((rendering) => "Board");
  };

  const onRenderChart = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRendering((rendering) => "Chart");
  };

  useEffect(() => {
    console.log(userInfo);
  }, []);

  return (
    <div>
      <nav />
      <div>
        <button type="button" onClick={onRenderTodo}>
          todo
        </button>
        <button type="button" onClick={onRenderChart}>
          공부시간
        </button>
      </div>
      <div>
        {rendering === "Board" ? <Boards userInfo={userInfo} /> : <Chart userInfo={userInfo} />}
      </div>
    </div>
  );
};

export default Todo;

/*

투두 페이지에 대해서 생각을 해보겠습니다

투두 페이지에 렌더링 되어야 하는 친구들은 총 2가지입니다 

1. TODOS 칸반보드 

2. 공부시간 CHART 


버튼은 TODO 버튼과 공부시간 버튼이 있습니다 
1. TODO 버튼을 클릭 하는 경우, 
- render 상태값을 todo로  변경한다


2. 공부시간 버튼을 클릭 하는 경우,
- render 상태값을 chart 로 변경한다 

상태 하나로 관리하니까 버튼 다시 클릭 했을때 다른 페이지로 전환이 되어버린다
상태를 2개로 할건지, 함수를 나눠서 할건지 결정해야겠네요
뭐가 더 효율적일까? 


*/

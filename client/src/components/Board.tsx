import axios, { AxiosError, AxiosResponse } from "axios";

import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SERVER = process.env.REACT_APP_SERVER;
axios.defaults.withCredentials = true;

const Card = styled.div`
  margin: 5px;
  border: 3px solid red;
  overflow-y: scroll;
  width: 33rw;
  height: 500px;
`;

const Card2 = styled.div`
  margin: 5px;
  border: 3px solid red;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Board = () => {
  const [writeMode, setWriteMode] = useState(false);
  const [toDoList, setToDoList] = useState<any>([{ content: "", type: "" }]);

  // const [toDoList, setToDoList] = useState<any>([{ content: "", sort: "" }]);

  // const [toDoList, setToDoList] = useState<any>([
  // { content: "", toDo: false, progress: false, done: false },
  // ]);

  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  // 로그인시 저장 된 userInfo 가지고 오기

  // ----------------- 글 쓰기창 추가 렌더링 ------------------------------
  const onWriteMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWriteMode((writing) => !writing);
  };
  // -----------------------------

  const onWrite = (key: string, type: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setToDoList(toDoList.concat({ [key]: e.target.value, type: type }));
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (toDoList) {
      setWriteMode(false);
    } else {
      setWriteMode(false);
    }
  };

  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const dragged = e.target;
  };
  // --------------- 칸반 데이터 불러오기 -----------------
  const onLoadingKanban = () => {
    axios
      .get(`${SERVER}/toDo`, {
        headers: {
          authorization: `Bearer ${userInfo.accessToken}`,
        },
      })
      .then((res: AxiosResponse) =>
        /*
       가지고 온 데이터에 따라서 분류해서 상태에 넣어주기
      */ console.log(res)
      )
      .catch((err: AxiosError) => console.log(err));
  };

  // useEffect(() => {
  //   onLoadingKanban();
  // }, []);
  //------------------------------------------------------

  return (
    <div>
      <button onClick={onLoadingKanban}> 정보 받아오기 </button>
      <Section>
        <Card>
          <div className="todos">
            <Menu>
              <span>갯수 : {toDoList === null ? 0 : toDoList.length} </span> <span> todos </span>{" "}
              <button onClick={onWriteMode}> 추가 </button>
            </Menu>
            {writeMode ? (
              <form>
                {/* onSubmit={(e: React.FormEvent) => e.preventDefault()} */}
                <div>
                  <textarea onChange={onWrite("content", "todo")} />
                </div>
                <div>
                  <button type="button" onClick={onSubmit}>
                    확인
                  </button>
                  <button onClick={onWriteMode}>취소</button>
                </div>
              </form>
            ) : (
              <div></div>
            )}
            <article>
              {toDoList.map((toDo: any) => {
                return <Card2 draggable={true}>{toDo}</Card2>;
              })}
            </article>
          </div>
        </Card>
        <Card onDragOver={onDrag}></Card>
      </Section>
    </div>
  );
};

export default Board;

/*


칸반 보드에 대해서 생각을 해봅시다. 
보드가 렌더링 될 때는 기존의 저장 된 보드의 데이터들을 먼저 불러와야 한다 
불러 온 내용을 렌더링 해주면 된다.
렌더링 할 내용이 없는 경우 빈 보드를 보여주면 될 것

그리고 보드를 생성하는 경우 post 요청을 진행한다. 

데이터를 가지고 오는 경우,
res.data의 타입별로 분류하여 각 데이터를 저장해준다? 흠

수정 
patch 요청을 전달하고, 정상적으로 수정이 완료가 되었으면
// get 요청을 통해서 내역을 받아온다. 

삭제 
delete 요청을 전달하고, 200 ok가 되면, 
// get 요청으로 다시 내역 받아오기???
todoList 에서 필터링을 통해 해당하는 todo를 삭제를 하면 되는데
해당하는 todo를 대체 어떻게 확인하지? 

우선 보드 배경은 드래그가 되어서는 안되겠다.


*/

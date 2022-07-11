import { DragDropContext, DropResult } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import Cardboard from "./Cardboard";
import styled from "styled-components";
import axios, { AxiosError, AxiosResponse } from "axios";

const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

const Wrapper = styled.div`
  background: #4b6587;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70vh;
  width: 70vw;
  margin: 0;
  align-items: center;
  @media only screen and (max-width: 400px) {
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
  }
`;

const BackBoard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  min-height: 55vh;
  max-height: 65vh;
  width: 70vw;
  gap: 2vw;
  margin-bottom: 5vh;
  @media only screen and (max-width: 400px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

interface ToDos {
  [key: string]: any;
}

const Boards = ({ userInfo }: any) => {
  const [text, setText] = useState<string | null>("");
  const onAddText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const [toDos, setToDos] = useState<ToDos>({
    Todo: [],
    Progress: [],
    Done: [],
  });

  //----------------------------- TODO 데이터 불러오기 --------------------------
  const onLoadToDos = () => {
    axios
      .get(`${SERVER}/todo`, {
        headers: {
          authorization: `Bearer ${userInfo.accessToken}`,
        },
      })
      .then((res: AxiosResponse) => {
        const data = res.data.data;
        if (data.length === 0) {
          return;
        }
        data.forEach((data: any) => {
          const id = data.id;
          const key = data.type;
          const text = data.content;

          const newToDo = {
            id: id,
            text: text,
          };

          setToDos((toDos) => {
            return {
              ...toDos,
              [key]: [...toDos[key], newToDo],
            };
          });
        });
      })
      .catch((err: AxiosError) => console.log("TODOS ERROR :", err));
  };

  useEffect(() => {
    onLoadToDos();
  }, []);

  //-----------------------------------------------------------

  //------------------ TODO 데이터 추가하기 ---------------------------
  const onAddToDos = (key: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (text?.length === 0) {
      return;
    } else {
      const newToDo = {
        id: new Date().getTime(),
        text: text,
      };

      setToDos((toDos) => {
        return {
          ...toDos,
          [key]: [...toDos[key], newToDo],
        };
      });
      setText("");
    }

    axios
      .post(
        `${SERVER}/todo`,
        { content: text, type: key },
        { headers: { authorization: `Bearer ${userInfo.accessToken}` } }
      )
      .then((res: AxiosResponse) => {})
      .catch((err: AxiosError) => {});
    window.location.reload();
  };

  // ------------------------ TODOS 삭제 ----------------------------------
  const onDeleteToDos = (key: string, id: any) => () => {
    setToDos((toDos) => {
      return {
        ...toDos,
        [key]: [...toDos[key].filter((todo: any) => todo.id !== id)],
      };
    });

    axios
      .delete(`${SERVER}/todo/${id}`, {
        headers: { authorization: `Bearer ${userInfo.accessToken}` },
      })
      .then((res: AxiosResponse) => {})
      .catch((err: AxiosError) => {});
  };

  //----------------------------- TODOS 드래그 ----------------------------
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      // 같은 카드보드 내부에서의 이동
      const sourceToDos = [...toDos[source.droppableId]];
      const sourceObj = sourceToDos[source.index];

      sourceToDos.splice(source.index, 1);
      sourceToDos.splice(destination.index, 0, sourceObj);
      setToDos({ ...toDos, [source.droppableId]: sourceToDos });
    }
    if (destination.droppableId !== source.droppableId) {
      // 다른 카드 보드간의 이동
      const sourceToDos = [...toDos[source.droppableId]];
      const sourceObj = sourceToDos[source.index];
      const targetToDos = [...toDos[destination.droppableId]];

      sourceToDos.splice(source.index, 1);
      targetToDos.splice(destination.index, 0, sourceObj);

      setToDos({
        ...toDos,
        [source.droppableId]: sourceToDos,
        [destination.droppableId]: targetToDos,
      });
      // ------------------ToDOS 데이터 수정 (Type 변경)-----------------------------
      axios
        .patch(
          `${SERVER}/todo/${draggableId}`,
          { type: destination.droppableId, content: sourceObj.text },
          {
            headers: { authorization: `Bearer ${userInfo.accessToken}` },
          }
        )
        .then((res: AxiosResponse) => {})
        .catch((err: AxiosError) => {});
    }
  };

  //------------------------------------- ----------------------------

  return (
    <Wrapper>
      <h1 style={{ color: "white" }}> 간단한 메모와 함께 오늘 할 일을 체크해보세요</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <BackBoard>
          {Object.keys(toDos).map((boardId) => (
            <Cardboard
              onAddText={onAddText}
              onAddToDos={onAddToDos}
              boardId={boardId}
              key={boardId}
              toDos={toDos[boardId]}
              text={text}
              onDeleteToDos={onDeleteToDos}
            />
          ))}
        </BackBoard>
      </DragDropContext>
    </Wrapper>
  );
};

export default Boards;

import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import React, { useState } from "react";
import Cardboard from "./Cardboard";
import Cards from "./Card";
import styled from "styled-components";
import axios, { AxiosError, AxiosResponse } from "axios";

const SERVER = process.env.REACT_APP_SERVER;

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  min-height: 90vh;
  width: 90vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const BackBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  min-height: 50px;
  gap: 30px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface ToDosInterface {
  id: number;
  text: any;
}

interface ToDos {
  [key: string]: any;
}

const Boards = (userInfo: any) => {
  const [text, setText] = useState<string | null>("");

  const onAddText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const [toDos, setToDos] = useState<ToDos>({
    Todo: [{ id: 1, text: "dummyData" }],
    Progress: [],
    Done: [],
  });

  const onLoadToDos = () => {
    axios
      .get(`${SERVER}/todo`, { headers: { authorization: `Bearer ${userInfo.accessToken}` } })
      .then((res: AxiosResponse) => {
        setToDos((toDos) => {
          return {
            ...toDos,
            [res.data.type]: [...toDos[res.data.type]],
          };
        });
      })
      .catch((err: AxiosError) => console.log(err));
  };

  const onAddToDos = (key: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const newToDo = {
      id: Math.random(),
      text: text,
    };

    setToDos((toDos) => {
      return {
        ...toDos,
        [key]: [...toDos[key], newToDo],
      };
    });
    setText("");

    console.log(toDos);

    axios
      .post(
        `${SERVER}/todo`,
        { content: text, type: key },
        { headers: { authorization: `Bearer ${userInfo.accessToken}` } }
      )
      .then((res: AxiosResponse) => console.log(res))
      .catch((err: AxiosError) => console.log(err));
  };

  const onModifyToDos = (key: string) => (e: any) => {
    const filteredToDos = toDos[key].filter((todo: any) => todo.id !== e.currentTarget.value);
    console.log(e.currentTarget.value);

    setToDos((toDos) => {
      return {
        ...toDos,
        [key]: [...toDos[key], filteredToDos],
      };
    });
  };

  /*
 버튼의 value와 toDoText의 id가 같다면 삭제 또는 수정이 가능 할 수 있을것. 
 그러기 위해서는  기존의 모든 값들을 가지고 오고 



  */

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      // 같은 카드보드 내부에서의 이동
      const sourceToDos = [...toDos[source.droppableId]];
      const sourceObj = sourceToDos[source.index];
      console.log(sourceObj);
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
    }
  };

  /*

  데이터의 변경이 일어난 객체만 추출한다
  추출한 객체를 변경한다.

  */

  // const onValid =
  //   ({ toDo }: FormInterface) =>
  //   (e: React.ChangeEvent<HTMLFormElement>) => {
  //     const newTodo = {
  //       id: Math.random(),
  //       text: e.target.value,
  //       type: "",
  //     };
  //   };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <BackBoard>
          {Object.keys(toDos).map((boardId) => (
            <Cardboard
              onAddText={onAddText}
              onAddToDos={onAddToDos}
              boardId={boardId}
              key={boardId}
              toDos={toDos[boardId]}
              text={text}
              onModifyToDos={onModifyToDos}
            />
          ))}
        </BackBoard>
      </Wrapper>
    </DragDropContext>
  );
};

export default Boards;
/*

react-beautiful-dnd 
- 리액트에서 drag & drop 을 쉽고 편리하게 사용 할 수 있는 라이브러리

DragDropContext > 최상위 컬럼
Dropaable > 드롭을 할 수 있는 부분 , 인자로는 함수를 가짐
dropableId 와 Chileren 요소가 필요함
children은 함수여야만 함 


Draggable 
> children 으로 함수를 요청 
draggableId , index 를 요청 
{...provided.draggableProps} 속성이 적용 되는 경우 모든 부분이 드래그가 적용
텍스트의 복사를 위한 드래그에 방해가 됨으로 아래 속성을 함께 이용하는게 좋을듯 
{...provided.dragHandleProps} 속성이 적용되는 경우 해당 속성이 적용 된 태그만 드래그가 가능함 
 {...provided.dragHandleProps} 속성이 없으변 드래그가 안댐 



 onDragEnd=() => {}

 > arg 로  확인 가능 
 destination > 드래그 드롭의 목적지 

 Source > index :  , droppableId : 
 - droppableId를 통해 다른 보드 간의 이동을 가능.




  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    source.index => 내가 사용 하는 값의 index,
    source.droppableId => 드래그 시작 하는 값의 Board 값
    destination.index => 드래그 종료 후 가져야 하는 index
    destination.dropableId => 드래그 종료 후 갖게 되는 Board 값
    if (!destination) {
        return;
      } else {
        const copyToDos = [...toDos];
        const target: any = copyToDos.splice(source.index, 1);
        copyToDos.splice(destination.index, 0, draggableId);
        setToDos([...copyToDos]);
    }
  };








key => todo
기본 상태는 기존의 배열
수정하는 함수까지 부르려면 ? < action 


 */

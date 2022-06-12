import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";
// import { MdDeleteForever } from "react-icons/md";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => (props.isDragging ? "lightgrey" : "white")};
  border: 5px solid pink;
  border-radius: 10px;
  min-width: 200px;
  min-height: 35px;
  padding: 5px;
`;

const Button = styled.button`
  box-shadow: inset 0px 1px 0px 0px #cf866c;
  background: linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
  background-color: #d0451b;
  border-radius: 15px;
  border: 1px solid #942911;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 15px;
  padding: 5px 7px;
  text-shadow: 0px 2px 0px #854629;

  &&:hover {
    background: linear-gradient(to bottom, #bc3315 5%, #d0451b 100%);
    background-color: #bc3315;
  }
  &::active {
    position: relative;
    top: 1px;
  }
`;

interface CardInterface {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: any;
  onDeleteToDos: any;
}

const Cards = ({ boardId, toDoId, toDoText, index, onDeleteToDos }: CardInterface) => {
  return (
    <Draggable draggableId={toDoId.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDoText}
          <Button onClick={onDeleteToDos(boardId, toDoId)}>{/* <MdDeleteForever /> */}</Button>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(Cards);

// React.memo 는 props가 변경되는 경우 리렌더링을 하나, 그 외의 컴포넌트들은 리렌더링을 하지 않음
// 불필요한 리렌더링이 많이 발생 되는 경우 최적화를 위해 사용 가능

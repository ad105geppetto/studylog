import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "lightgrey" : "white")};
  border: 5px solid pink;
  border-radius: 10px;
  min-width: 200px;
  min-height: 35px;
  padding: 5px;
`;

interface CardInterface {
  toDo: string;
  index: number;
}

const Cards = ({ toDo, index }: CardInterface) => {
  console.log(toDo);
  return (
    <Draggable draggableId={toDo} key={toDo} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(Cards);

// React.memo 는 props가 변경되는 경우 리렌더링을 하나, 그 외의 컴포넌트들은 리렌더링을 하지 않음
// 불필요한 리렌더링이 많이 발생 되는 경우 최적화를 위해 사용 가능

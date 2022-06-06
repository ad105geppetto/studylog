import { Droppable } from "react-beautiful-dnd";
import Cards from "./Card";
import styled from "styled-components";
import { useState } from "react";

const Board = styled.div`
  background-color: #c2f7bd;
  min-height: 400px;
  min-width: 330px;
  border: 5px solid white;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
`;

interface AreaInterface {
  isDraggingOver: boolean;
  isDraggingFrom: boolean;
}
const Area = styled.div<AreaInterface>`
  flex-grow: 1;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDraggingOver ? "coral" : props.isDraggingFrom ? "orange" : "pink"};
  transition: background-color 0.2s ease-in-out;
`;
interface CardBoardProps {
  toDos: string[];
  boardId: string;
}

const Cardboard = ({ toDos, boardId }: CardBoardProps) => {
  const [writeMode, setWriteMode] = useState(true);

  const onWriteMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWriteMode((writing) => !writing);
  };

  return (
    <Board>
      <Title>{boardId}</Title>
      <button onClick={onWriteMode}> 추가 </button>
      {writeMode ? (
        <form>
          <div>
            <textarea />
          </div>
          <div>
            <button type="button">확인</button>
            <button onClick={onWriteMode}>취소</button>
          </div>
        </form>
      ) : (
        <div></div>
      )}
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFrom={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <Cards key={toDo} toDo={toDo} index={index} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Board>
  );
};

export default Cardboard;

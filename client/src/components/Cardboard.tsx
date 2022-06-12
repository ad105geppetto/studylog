import { Droppable } from "react-beautiful-dnd";
import Cards from "./Card";
import styled from "styled-components";

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

const Area = styled.div<AreaInterface>`
  flex-grow: 1;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDraggingOver ? "coral" : props.isDraggingFrom ? "orange" : "pink"};
  transition: background-color 0.2s ease-in-out;
`;

interface ToDosInterface {
  id: number;
  text: string;
}

interface AreaInterface {
  isDraggingOver: boolean;
  isDraggingFrom: boolean;
}

interface CardBoardProps {
  toDos: ToDosInterface[];
  boardId: string;
  onAddText: any;
  onAddToDos: any;
  text: any;
  onDeleteToDos: any;
  writeMode: any;
  onWriteMode: any;
}

const Cardboard = ({
  toDos,
  boardId,
  onAddToDos,
  onAddText,
  text,
  onDeleteToDos,
  writeMode,
  onWriteMode,
}: CardBoardProps) => {
  return (
    <Board>
      <Title>{boardId}</Title>
      <button type="button" onClick={onWriteMode}>
        추가하기
      </button>
      {writeMode ? (
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
          <input onChange={onAddText} value={text} type="text" />
          <button type="submit" onClick={onAddToDos(boardId)}>
            확인
          </button>
          <button onClick={onWriteMode}> 취소 </button>
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
              <Cards
                boardId={boardId}
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
                onDeleteToDos={onDeleteToDos}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Board>
  );
};

export default Cardboard;

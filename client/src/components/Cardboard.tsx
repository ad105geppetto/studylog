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

const Form = styled.form`
  width: 100%;
  margin: 0;
  padding: 0;
  input {
    width: 100%;
  }
`;

const Area = styled.div<AreaInterface>`
  flex-grow: 1;
  margin: 0.7vh;
  padding: 0.3vh;
  border-radius: 0.5vh;
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
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
          <input onChange={onAddText} type="text" />
          <button type="submit" onClick={onAddToDos(boardId)}>
            확인
          </button>
          <button onClick={onWriteMode}> 취소 </button>
        </Form>
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

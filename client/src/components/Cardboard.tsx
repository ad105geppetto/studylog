import { Droppable } from "react-beautiful-dnd";
import Cards from "./Card";
import styled from "styled-components";
import { MdAddCircle } from "react-icons/md";
const Board = styled.div`
  background-color: #eeeeee;
  overflow-y: auto;
  min-height: 40vh;
  min-width: 18vw;

  box-shadow: 0.2vw 0.2vw 0.5vw 0.2vw rgba(0, 0, 0, 0.69);
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Title = styled.h1`
  display: flex;
  justify-content: space-evenly;
`;

const Form = styled.form`
  min-width: 18vw;
  height: 4vh;
  display: flex;
  padding: 0;

  input {
    border: none;
    resize: none;
    overflow: hidden;
    margin-left: 0.5vw;
    width: 100%;
    min-height: 3.5vh;
    line-height: 3.5vh;
  }

  button {
    display: inline-block;
    all: unset;
    margin-left: 0.5vw;
    color: #4b6587;
    align-self: center;

    padding-right: 0.4vw;
    font-size: 1rem;

    &:hover {
      color: red;
    }

    &:active {
      position: relative;
      top: 1px;
    }
  }
`;

const Area = styled.div<AreaInterface>`
  flex-grow: 1;
  margin: 0.7vh;
  padding: 0.3vh;
  border-radius: 0.5vh;
  background-color: ${(props) =>
    props.isDraggingOver ? "#dbdbdb" : props.isDraggingFrom ? "white" : "#eeeeee"};
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
}

const Cardboard = ({ toDos, boardId, onAddToDos, onAddText, onDeleteToDos }: CardBoardProps) => {
  return (
    <Board>
      <Title>
        <div>{boardId}</div> <div id="length"> {toDos.length}</div>
      </Title>
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input onChange={onAddText} placeholder={`${boardId} 를 추가하세요`} />
        <button type="submit" id="inputbutton" onClick={onAddToDos(boardId)}>
          <MdAddCircle size="3.5vh" />
        </button>
      </Form>

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

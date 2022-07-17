import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";
import { MdCancelPresentation } from "react-icons/md";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => (props.isDragging ? "#fce8e8" : "white")};
  box-shadow: ${(props) => (props.isDragging ? "10px 5px 5px black" : "")};
  margin-bottom: 0.4vh;

  border: 0.2vh solid cornflowerblue;
  max-width: 15.8vw;
  min-height: 4vh;
  line-height: 4vh;
  font-size: 1rem;
  text-align: center;
  padding: 0 0.5vw 0 0.5vw;
  word-break: break-all;

  @media only screen and (max-width: 400px) {
    max-width: 250px;
  }

  button {
    all: unset;
    color: orange;
    align-self: center;
    margin-left: 0.3vw;
    font-size: 1.5rem;

    &:hover {
      color: red;
    }
    &:active {
      position: relative;
      top: 1px;
    }
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
          <button onClick={onDeleteToDos(boardId, toDoId)} id="removebutton">
            <MdCancelPresentation />
          </button>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(Cards);

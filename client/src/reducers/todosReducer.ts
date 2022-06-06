import { initialState } from "./initialState";
import { DELETE_TODO, DRAG_TODO } from "action";
import { CREATE_TODO, CREATE_PROGRESS, CREATE_DONE } from "action";
//! any 타입 수정 필요

const todosReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_TODO:
      return { ...state, toDos: action.payload };
    case CREATE_PROGRESS:
      return { ...state, toDos: action.payload };
    case CREATE_DONE:
      return { ...state, toDos: action.payload };
    case DELETE_TODO:
      return { ...state, toDos: action.payload };
    case DRAG_TODO:
      return { ...state, toDos: action.payload };
    default:
      return state;
  }
};

export default todosReducer;

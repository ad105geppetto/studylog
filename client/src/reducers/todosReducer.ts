import { initialState } from "./initialState";
// import { DELETE_TODO, DRAG_TODO } from "action";
import { CREATE_TODO } from "action";
//! any 타입 수정 필요

const todosReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        // toDos: {...state.toDos, action.payload}
      };
    //   case DELETE_TODO:
    //     return { ...state, toDos: action.payload };
    //   case DRAG_TODO:
    //     return { ...state, toDos: action.payload };
    default:
      return state;
  }
};
export default todosReducer;

/*
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

*/

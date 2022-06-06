export const LOG_IN = "LOG_IN";
export const logIn = (
  accessToken: string,
  id: string,
  userId: string,
  email: string,
  profile: string
) => {
  return {
    type: LOG_IN,
    payload: {
      accessToken,
      id,
      userId,
      email,
      profile,
    },
  };
};
// ------------------------------------
export const CREATE_TODO = "CREATE_TODO";
export const createToDo = (id: string, content: string, type: string) => {
  return {
    type: createToDo,
    payload: {
      id,
      content,
      type: "todo",
    },
  };
};

export const CREATE_PROGRESS = "CREATE_PROGRESS";
export const createProgress = (id: string, content: string, type: string) => {
  return {
    type: createProgress,
    payload: {
      id,
      content,
      type: "progress",
    },
  };
};

export const CREATE_DONE = "CREATE_DONE";
export const createDone = (id: string, content: string, type: string) => {
  return {
    type: createDone,
    payload: {
      id,
      content,
      type: "done",
    },
  };
};

export const DELETE_TODO = "DELETE_TODO";
export const deletetoDo = (idcontent: string, type: string) => {
  return {
    type: deletetoDo,
    payload: {},
  };
};

export const DRAG_TODO = "DRAG_TODO";
export const dragToDo = (id: string, content: string, type: string) => {
  return {
    type: dragToDo,
    payload: {
      id,
      content,
      type,
    },
  };
};

/*

드래그 앤 드롭은 자유롭게 움직이지 않습니까....
그러면 내가 바꿔줄 수 있는것은

state를 불러와서, 
  const onDragEnd = ({ destination, source }: DropResult) => {
    const target = toDos.splice(source.index, 1);
    console.log(target);
    console.log
    setToDos(...toDos, targetdestination.in;
    기존의 배열을 불러와서 새로운 객체를 만들어주고 



*/

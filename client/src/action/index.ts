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

export const LOG_OUT = "LOG_OUT";
export const logout = (accessToken: string) => {
  return {
    type: LOG_OUT,
    payload: {
      accessToken,
    },
  };
};

// 드래그 앤 드롭은 자유롭게 움직이지 않습니까....
// 그러면 내가 바꿔줄 수 있는것은

// state를 불러와서,
//   const onDragEnd = ({ destination, source }: DropResult) => {
//     const target = toDos.splice(source.index, 1);
//     console.log(target);
//     console.log
//     setToDos(...toDos, targetdestination.in;
//     기존의 배열을 불러와서 새로운 객체를 만들어주고

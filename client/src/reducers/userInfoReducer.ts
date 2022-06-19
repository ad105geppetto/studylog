import { initialState } from "./initialState";
import { LOG_IN, DROP_OUT, LOG_OUT } from "action";

//! any 타입 수정 필요

const userInfoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, userInfo: action.payload };
    case DROP_OUT:
      return { ...state, userInfo: action.payload };
    case LOG_OUT:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export default userInfoReducer;

import { initialState } from "./initialState";
import { ROOM_LIST } from "action";

const pageInfoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ROOM_LIST:
      return { ...state, pageInfo: action.payload };

    default:
      return state;
  }
};

export default pageInfoReducer;

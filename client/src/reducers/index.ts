import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";
import todosReducer from "./todosReducer";

const rootReducer = combineReducers({ userInfoReducer, todosReducer });

export default rootReducer;

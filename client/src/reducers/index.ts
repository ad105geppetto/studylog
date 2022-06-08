import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";
import todosReducer from "./todosReducer";
// ---
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({ userInfoReducer, todosReducer });

export default persistReducer(persistConfig, rootReducer);

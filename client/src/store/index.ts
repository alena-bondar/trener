import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer";
// import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  user: userReducer,
  emailInLogin: userReducer,
});

export const store = createStore(rootReducer);

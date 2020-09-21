import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  loginReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
export type rootState = ReturnType<typeof rootReducer>;

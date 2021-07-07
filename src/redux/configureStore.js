import { createStore } from "redux";
import { reducer, initialState } from "./reducer";

const ConfigureStore = () => {
  return createStore(reducer, initialState);
};

export const store = ConfigureStore();

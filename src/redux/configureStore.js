import { createStore, combineReducers } from "redux";
import { Tasks } from "./reducers/tasks";
import { Comments } from "./reducers/comments";
import { Labels } from "./reducers/labels";
import { Projects } from "./reducers/projects";

const ConfigureStore = () => {
  return createStore(
    combineReducers({
      tasks: Tasks,
      comments: Comments,
      labels: Labels,
      projects: Projects,
    })
  );
};

export const store = ConfigureStore();

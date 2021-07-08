import * as ActionTypes from "./ActionTypes";
import axios from "axios";
import { BASE_URL } from "../../shared/baseUrl";

export const fetchTasks = () => (dispatch) => {
  dispatch(tasksLoading());
  return axios
    .get(BASE_URL + "/tasks")
    .then((res) => {
      console.log(res.data);
      dispatch(addTasks(res.data));
    })
    .catch((err) => {
      dispatch(tasksFailed(err.message));
    });
};

export const tasksLoading = () => {
  return {
    type: ActionTypes.TASKS_LOADING,
  };
};

export const addTasks = (tasks) => {
  return {
    type: ActionTypes.ADD_TASKS,
    payload: tasks,
  };
};

export const tasksFailed = (errMsg) => {
  return {
    type: ActionTypes.TASKS_FAILED,
    payload: errMsg,
  };
};

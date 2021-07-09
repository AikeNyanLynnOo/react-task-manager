import * as ActionTypes from "./ActionTypes";
import axios from "axios";
import { BASE_URL } from "../../shared/baseUrl";

// Fetchs
export const fetchTasks = () => (dispatch) => {
  dispatch(tasksLoading());
  return axios
    .get(BASE_URL + "/tasks")
    .then((res) => {
      dispatch(addTasks(res.data));
    })
    .catch((err) => {
      dispatch(tasksFailed(err.message));
    });
};
export const fetchComments = () => (dispatch) => {
  dispatch(commentsLoading());
  return axios
    .get(BASE_URL + "/comments")
    .then((res) => {
      dispatch(addcomments(res.data));
    })
    .catch((err) => {
      dispatch(commentsFailed(err.message));
    });
};
export const fetchLabels = () => (dispatch) => {
  dispatch(labelsLoading());
  return axios
    .get(BASE_URL + "/labels")
    .then((res) => {
      console.log("Here labels" + res.data);
      dispatch(addlabels(res.data));
    })
    .catch((err) => {
      dispatch(labelsFailed(err.message));
    });
};
export const fetchProjects = () => (dispatch) => {
  dispatch(projectsLoading());
  return axios
    .get(BASE_URL + "/projects")
    .then((res) => {
      dispatch(addProjects(res.data));
    })
    .catch((err) => {
      dispatch(projectsFailed(err.message));
    });
};

// actions

// tasks
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

// comments
export const commentsLoading = () => {
  return {
    type: ActionTypes.COMMENTS_LOADING,
  };
};

export const addcomments = (comments) => {
  return {
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
  };
};

export const commentsFailed = (errMsg) => {
  return {
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMsg,
  };
};

// labels

export const labelsLoading = () => {
  return {
    type: ActionTypes.LABELS_LOADING,
  };
};

export const addlabels = (labels) => {
  return {
    type: ActionTypes.ADD_LABELS,
    payload: labels,
  };
};

export const labelsFailed = (errMsg) => {
  return {
    type: ActionTypes.LABELS_FAILED,
    payload: errMsg,
  };
};

// projects

export const projectsLoading = () => {
  return {
    type: ActionTypes.PROJECTS_LOADING,
  };
};

export const addProjects = (projects) => {
  return {
    type: ActionTypes.ADD_PROJECTS,
    payload: projects,
  };
};

export const projectsFailed = (errMsg) => {
  return {
    type: ActionTypes.PROJECTS_FAILED,
    payload: errMsg,
  };
};

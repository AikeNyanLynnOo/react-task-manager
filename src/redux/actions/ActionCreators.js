import * as ActionTypes from "./ActionTypes";
import axios from "axios";
import { BASE_URL } from "../../shared/baseUrl";

import CryptoJS from "crypto-js";
// Fetchs
export const fetchTasks = (userId) => (dispatch) => {
  dispatch(tasksLoading());
  return axios
    .get(BASE_URL + "/tasks")
    .then((resTasks) => {
      axios
        .get(BASE_URL + "/projects")
        .then((resProjects) => {
          dispatch(addProjects(resProjects.data));
          axios
            .get(BASE_URL + "/labels")
            .then((resLabels) => {
              dispatch(addLabels(resLabels.data));
              dispatch(
                addTasks(
                  mutateTasks(
                    resTasks.data.filter((tks) => tks.userId === userId),
                    resProjects.data,
                    resLabels.data
                  )
                )
              );
            })
            .catch((err) => {
              dispatch(tasksFailed(err.message));
            });
        })
        .catch((err) => {
          dispatch(tasksFailed(err.message));
        });
    })
    .catch((err) => {
      dispatch(tasksFailed(err.message));
    });
};
export const mutateTasks = (tasks, projects, labels) => {
  return tasks.map((task) => {
    var newTask = task;
    newTask.project = projects.filter((p) => p.id === task.project)[0].title;
    newTask.label = labels.filter((l) => l.id === task.label)[0].text;
    return newTask;
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
      dispatch(addLabels(res.data));
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

export const addLabels = (labels) => {
  console.log("ADDING LABELS");
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

// Auth

export const loginUser = (user) => (dispatch) => {
  dispatch(loginLoading());
  setTimeout(() => {
    dispatch(fetchComments());
    dispatch(fetchTasks(1));
    dispatch(loginSuccess(user));
  }, 2000);
};

export const loginWithToken = (token) => (dispatch) => {
  var bytes = CryptoJS.AES.decrypt(token, "123");
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  dispatch(loginLoading());
  setTimeout(() => {
    dispatch(fetchComments());
    dispatch(fetchTasks(1));
    dispatch(loginSuccess({}));
  }, 2000);
};

export const loginLoading = () => {
  return {
    type: ActionTypes.LOGIN_LOADING,
  };
};

export const loginSuccess = (user) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailed = (errMsg) => {
  return {
    type: ActionTypes.LOGIN_FAILED,
    payload: errMsg,
  };
};

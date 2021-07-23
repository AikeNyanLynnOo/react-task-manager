import * as ActionTypes from "./ActionTypes";
import axios from "axios";
import { BASE_URL } from "../../shared/baseUrl";

import CryptoJS, { AES } from "crypto-js";
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
    newTask.dueDate = new Intl.DateTimeFormat(['ban', 'id']).format(
      new Date(task.dueDate)
    );
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

export const postTask = (task, userId) => (dispatch) => {
  return axios
    .post(BASE_URL + "/tasks", {
      userId: userId,
      title: task.title,
      dueDate: task.dueDate,
      dueTime: task.dueTime,
      progress: 0,
      priority: +task.priority,
      label: +task.label,
      project: +task.project,
      remindMe: task.remindMe,
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(fetchComments());
        dispatch(fetchTasks(userId));
        dispatch(postTaskSuccess(res.data[0]));
      }
    })
    .catch((err) => {
      dispatch(postTaskFailed(err.message));
    });
};

export const postTaskSuccess = (task) => {
  return {
    type: ActionTypes.POST_TASK_SUCCESS,
    payload: "New task created with title : " + task.title,
  };
};
export const postTaskFailed = (errMsg) => {
  return {
    type: ActionTypes.POST_TASK_FAILED,
    payload: errMsg,
  };
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

export const registerUser = (user) => (dispatch) => {
  return axios
    .get(BASE_URL + "/users", {
      params: {
        email: user.email,
      },
    })
    .then((res) => {
      if (res.data.length < 1) {
        return axios
          .post(BASE_URL + "/users", {
            email: user.email,
            password: AES.encrypt(user.password, "123").toString(),
          })
          .then((res) => {
            dispatch(registerSuccess());
          })
          .catch((err) => {
            dispatch(registerFailed("Register Failed!"));
          });
      } else {
        dispatch(registerFailed("Email has alrealy been used!"));
      }
    })
    .catch((err) => {
      dispatch(registerFailed("Register Failed!"));
    });
};

export const fetchUser = (user) => (dispatch) => {
  return axios
    .get(BASE_URL + "/users", {
      params: {
        email: user.email,
      },
    })
    .then((res) => {
      var bytes = CryptoJS.AES.decrypt(res.data[0].password, "123");
      var pwd = bytes.toString(CryptoJS.enc.Utf8);
      if (pwd === user.password) {
        dispatch(fetchTasks(res.data[0].id));
        dispatch(loginSuccess(res.data[0]));
      } else {
        dispatch(loginFailed("Check your email or password"));
      }
    })
    .catch((err) => {
      dispatch(loginFailed(err.message));
    });
};

export const loginUser = (user) => (dispatch) => {
  dispatch(loginLoading());
  dispatch(fetchComments());
  dispatch(fetchUser(user));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logoutSuccess());
};

export const loginWithToken = (token) => (dispatch) => {
  var bytes = AES.decrypt(token, "123");
  var data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  dispatch(loginLoading());
  dispatch(fetchComments());
  dispatch(fetchUser(data));
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
export const logoutSuccess = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

export const loginFailed = (errMsg) => {
  return {
    type: ActionTypes.LOGIN_FAILED,
    payload: errMsg,
  };
};

export const registerLoading = () => {
  return {
    type: ActionTypes.REGISTER_LOADING,
  };
};

export const registerSuccess = (user) => {
  return {
    type: ActionTypes.REGISTER_SUCCESS,
    payload: user,
  };
};

export const registerFailed = (errMsg) => {
  return {
    type: ActionTypes.REGISTER_FAILED,
    payload: errMsg,
  };
};

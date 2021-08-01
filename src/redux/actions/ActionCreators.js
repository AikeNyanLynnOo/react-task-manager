import * as ActionTypes from "./ActionTypes";
import axios from "axios";
import { BASE_URL } from "../../shared/baseUrl";

import CryptoJS, { AES } from "crypto-js";
import moment from "moment";

// Tasks

// Tasks-dispatches

export const changeComplete = (task) => (dispatch) => {
  return axios
    .put(BASE_URL + `/tasks/${task.id}`, {
      ...task,
    })
    .then((res) => {
      dispatch(fetchTasks(task.userId));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changeCompleteAll = (tasks, userId, isComplete) => (dispatch) => {
  const myTasks = tasks.slice(1);
  const firstTask = tasks[0];

  return axios
    .put(BASE_URL + `/tasks/${firstTask.id}`, {
      ...firstTask,
      isComplete: isComplete,
    })
    .then((res) => {
      if (isComplete) {
        for (const task of myTasks) {
          axios
            .put(BASE_URL + `/tasks/${task.id}`, {
              ...task,
              isComplete: true,
            })
            .then((res) => {})
            .catch((err) => console.log(err.message));
        }
      } else {
        for (const task of myTasks) {
          axios
            .put(BASE_URL + `/tasks/${task.id}`, {
              ...task,
              isComplete: false,
            })
            .then((res) => {})
            .catch((err) => console.log(err.message));
        }
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch(fetchTasks(userId));
    });
};
export const fetchTasks = (userId) => (dispatch) => {
  console.log("USERID IS " + userId);
  dispatch(tasksLoading());
  return axios
    .get(BASE_URL + "/tasks")
    .then((resTasks) => {
      axios
        .get(BASE_URL + "/projects", {
          params: {
            userId: userId,
          },
        })
        .then((resProjects) => {
          dispatch(addProjects(resProjects.data));
          axios
            .get(BASE_URL + "/labels", {
              params: {
                userId: userId,
              },
            })
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
    })
    .then((res) => {
      if (res.status === 201) {
        if (task.comment !== "") {
          axios
            .post(BASE_URL + "/comments", {
              taskId: res.data.id,
              text: task.comment,
              date: moment(),
            })
            .then((res) => {
              //
              dispatch(fetchComments());
              dispatch(fetchTasks(userId));
              dispatch(postTaskSuccess(task));
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          dispatch(fetchComments());
          dispatch(fetchTasks(userId));
          dispatch(postTaskSuccess(task));
        }
      }
    })
    .catch((err) => {
      dispatch(postTaskFailed(err.message));
    });
};

export const putTask = (id, task) => (dispatch) => {
  return axios
    .put(BASE_URL + `/tasks/${id}`, {
      userId: task.userId,
      title: task.title,
      dueDate: task.dueDate,
      dueTime: task.dueTime,
      progress: +task.progress,
      priority: +task.priority,
      label: +task.label,
      project: +task.project,
    })
    .then((res) => {
      if (res.status === 200) {
        if (task.comment !== "") {
          axios
            .post(BASE_URL + "/comments", {
              taskId: res.data.id,
              text: task.comment,
              date: moment(),
            })
            .then((res) => {
              //
              dispatch(fetchComments());
              dispatch(fetchTasks(task.userId));
              dispatch(postNewCmtSuccess());
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          dispatch(fetchComments());
          dispatch(fetchTasks(task.userId));
          dispatch(putTaskSuccess(task));
        }
      }
    })
    .catch((err) => {
      dispatch(putTaskFailed(err.message));
    });
};

export const deleteTask = (id, userId) => (dispatch) => {
  return axios
    .delete(BASE_URL + `/tasks/${id}`)
    .then((res) => {
      dispatch(fetchComments());
      dispatch(fetchTasks(userId));
      dispatch(deleteTaskSuccess());
    })
    .catch((err) => {
      dispatch(deleteTaskFailed(err.message));
    });
};

export const deleteAllTasks = (auth) => (dispatch) => {
  console.log("Deleting all " + JSON.stringify(auth));
  if (auth.isLoggedIn) {
    return axios
      .delete(BASE_URL + `/users/${auth.user.id}`)
      .then((res) => {
        axios
          .post(BASE_URL + `/users`, {
            email: auth.user.email,
            password: auth.user.password,
          })
          .then((res) => {
            console.log(res);
            dispatch(fetchComments());
            dispatch(fetchTasks(res.data.id));
            dispatch(deleteTaskSuccess());
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
};

// Tasks-methods
export const changeFilter = (id) => {
  return {
    type: ActionTypes.CHANGE_FILTER_TYPE,
    payload: id,
  };
};
export const changeSort = (sort) => {
  return {
    type: ActionTypes.CHANGE_SORT_TYPE,
    payload: sort,
  };
};
export const changeSortOrder = (order) => {
  return {
    type: ActionTypes.CHANGE_ORDER_TYPE,
    payload: order,
  };
};

export const mutateTasks = (tasks, projects, labels) => {
  return tasks.map((task) => {
    var newTask = task;
    newTask.project = projects.filter((p) => p.id === task.project)[0]
      ? projects.filter((p) => p.id === task.project)[0].title
      : "Project not chosen";
    newTask.label = labels.filter((l) => l.id === task.label)[0]
      ? labels.filter((l) => l.id === task.label)[0].text
      : "Label not chosen";
    return newTask;
  });
};

// Tasks-actions
export const postTaskSuccess = (task) => {
  return {
    type: ActionTypes.POST_TASK_SUCCESS,
    payload: "New task created : " + task.title,
  };
};
export const postTaskFailed = (errMsg) => {
  return {
    type: ActionTypes.POST_TASK_FAILED,
    payload: errMsg,
  };
};
export const putTaskSuccess = (task) => {
  return {
    type: ActionTypes.PUT_TASK_SUCCESS,
    payload: "Updated task : " + task.title,
  };
};
export const putTaskFailed = (errMsg) => {
  return {
    type: ActionTypes.PUT_TASK_FAILED,
    payload: errMsg,
  };
};

export const deleteTaskSuccess = () => {
  return {
    type: ActionTypes.DELETE_TASK_SUCCESS,
    payload: "Deleted successfully!",
  };
};
export const deleteTaskFailed = (errMsg) => {
  return {
    type: ActionTypes.DELETE_TASK_FAILED,
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

// Comments

// Comments-dispatches
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

export const deleteComment = (id) => (dispatch) => {
  return axios
    .delete(BASE_URL + `/comments/${id}`)
    .then((res) => {
      console.log("Deleted comment with id" + res.data);
      dispatch(fetchComments());
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Comments-actions
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

export const postNewCmtSuccess = () => {
  return {
    type: ActionTypes.POST_NEW_CMT_SUCCESS,
    payload: "New comment is posted",
  };
};

// Labels

export const postNewProjectOrLabel = (userId, type, title) => (dispatch) => {
  if (type === "projects") {
    return axios
      .post(BASE_URL + "/projects", {
        title: title,
        createdAt: moment(),
        userId: userId,
      })
      .then((res) => {
        dispatch(postNewProjectSuccess("New Project " + title + "is created"));
        dispatch(fetchProjects(userId));
      })
      .catch((err) => {
        dispatch(postNewProjectSuccess(err.message));
      });
  } else {
    return axios
      .post(BASE_URL + "/labels", {
        text: title,
        createdAt: moment(),
        userId: userId,
      })
      .then((res) => {
        dispatch(postNewProjectSuccess("New Label " + title + "is created"));
        dispatch(fetchLabels(userId));
      })
      .catch((err) => {
        dispatch(postNewProjectSuccess(err.message));
      });
  }
};

// Labels-dispatches
export const fetchLabels = (userId) => (dispatch) => {
  dispatch(labelsLoading());
  return axios
    .get(BASE_URL + "/labels", {
      params: {
        userId: userId,
      },
    })
    .then((res) => {
      dispatch(addLabels(res.data));
    })
    .catch((err) => {
      dispatch(labelsFailed(err.message));
    });
};

// Labels-actions
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

export const postNewLabelSuccess = (msg) => {
  return {
    type: ActionTypes.POST_NEW_LABEL_SUCCESS,
    payload: msg,
  };
};
export const postNewLabelFailed = (errMsg) => {
  return {
    type: ActionTypes.POST_NEW_LABEL_FAILED,
    payload: errMsg,
  };
};

// Projects

// Projects-dispatches

export const editProject = (userId, id, title, createdAt) => (dispatch) => {
  return axios
    .put(BASE_URL + `/projects/${id}`, {
      title: title,
      updatedAt: moment(),
      createdAt: createdAt,
      userId: userId,
    })
    .then((res) => {
      dispatch(fetchProjects(userId));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const editLabel = (userId, id, text, createdAt) => (dispatch) => {
  return axios
    .put(BASE_URL + `/labels/${id}`, {
      text: text,
      updatedAt: moment(),
      createdAt: createdAt,
      userId: userId,
    })
    .then((res) => {
      dispatch(fetchLabels(userId));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProjectOrLabel =
  (userId, id, whatToDelete) => (dispatch) => {
    return axios
      .delete(BASE_URL + `/${whatToDelete}/${id}`)
      .then((res) => {
        if (whatToDelete === "projects") {
          dispatch(fetchProjects(userId));
        } else {
          dispatch(fetchLabels(userId));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const fetchProjects = (userId) => (dispatch) => {
  dispatch(projectsLoading());
  return axios
    .get(BASE_URL + "/projects", {
      params: {
        userId: userId,
      },
    })
    .then((res) => {
      dispatch(addProjects(res.data));
    })
    .catch((err) => {
      dispatch(projectsFailed(err.message));
    });
};

// Projects-actions
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

export const postNewProjectSuccess = (msg) => {
  return {
    type: ActionTypes.POST_NEW_PROJECT_SUCCESS,
    payload: msg,
  };
};
export const postNewProjectFailed = (errMsg) => {
  return {
    type: ActionTypes.POST_NEW_PROJECT_FAILED,
    payload: errMsg,
  };
};

// Auth

// Auth-dispatches
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
      if (res.data.length === 0) {
        dispatch(
          loginFailed(
            "Account with your email does not exist! Please register first!"
          )
        );
      } else {
        var bytes = CryptoJS.AES.decrypt(res.data[0].password, "123");
        var pwd = bytes.toString(CryptoJS.enc.Utf8);
        if (pwd === user.password) {
          const cipertxt = AES.encrypt(JSON.stringify(user), "123").toString();
          localStorage.setItem("token", cipertxt);
          dispatch(fetchTasks(res.data[0].id));
          dispatch(loginSuccess(res.data[0]));
        } else {
          dispatch(loginFailed("Check your email or password"));
        }
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

// Auth-actions
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

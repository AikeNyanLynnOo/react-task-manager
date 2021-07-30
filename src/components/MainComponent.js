import React from "react";
import Home from "./HomeComponent";
import MenuBar from "./MenuBarComponent";
import TaskDetail from "./TaskDetailComponent";
import AllTasks from "./AllTasksComponent";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./auth/Profile";
import Logout from "./auth/Logout";
import AllProjectsAndLabels from "./AllProjectsAndLabels";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchTasks,
  fetchComments,
  fetchLabels,
  fetchProjects,
  loginUser,
  loginWithToken,
  logoutUser,
  registerUser,
  postTask,
  putTask,
  deleteComment,
  deleteTask,
  deleteAllTasks,
  postNewProjectOrLabel,
  changeFilter,
  editProject,
  editLabel,
  deleteProjectOrLabel,
} from "../redux/actions/ActionCreators";

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    comments: state.comments,
    projects: state.projects,
    labels: state.labels,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: (userId) => dispatch(fetchTasks(userId)),
    fetchComments: () => dispatch(fetchComments()),
    fetchLabels: () => dispatch(fetchLabels()),
    fetchProjects: () => dispatch(fetchProjects()),
    loginUser: (user) => dispatch(loginUser(user)),
    loginWithToken: (token) => dispatch(loginWithToken(token)),
    registerUser: (user) => dispatch(registerUser(user)),
    logoutUser: () => dispatch(logoutUser()),
    postTask: (task, userId) => dispatch(postTask(task, userId)),
    putTask: (id, task, labels, projects) =>
      dispatch(putTask(id, task, labels, projects)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    deleteTask: (id, userId) => dispatch(deleteTask(id, userId)),
    deleteAllTasks: (auth) => dispatch(deleteAllTasks(auth)),
    postNewProjectOrLabel: (type, title) =>
      dispatch(postNewProjectOrLabel(type, title)),
    changeFilter: (id) => dispatch(changeFilter(id)),
    editProject: (id, title, createdAt) =>
      dispatch(editProject(id, title, createdAt)),
    editLabel: (id, title, createdAt) =>
      dispatch(editLabel(id, title, createdAt)),
    deleteProjectOrLabel: (id, whatToDelete) =>
      dispatch(deleteProjectOrLabel(id, whatToDelete)),
  };
};
class Main extends React.Component {
  componentDidMount() {
    var token = localStorage.getItem("token");
    if (token) {
      this.props.loginWithToken(token);
    }
  }
  render() {
    const TaskWithId = ({ match, location, history }) => {
      const taskId = parseInt(match.params.taskId, 10);
      return (
        <TaskDetail
          task={this.props.tasks.tasks.filter((task) => task.id === taskId)[0]}
          history={history}
          auth={this.props.auth}
          putTask={this.props.putTask}
          labels={this.props.labels}
          projects={this.props.projects}
          isLoading={this.props.tasks.isLoading}
          errMsg={this.props.tasks.errMsg}
          successMsg={this.props.tasks.successMsg}
          deleteComment={this.props.deleteComment}
          deleteTask={this.props.deleteTask}
        ></TaskDetail>
      );
    };
    return (
      <div>
        <MenuBar auth={this.props.auth}></MenuBar>
        <div className="container my-5 pt-5">
          <Switch>
            <Route
              path="/home"
              component={() => (
                <Home
                  tasks={this.props.tasks}
                  isLoading={this.props.tasks.isLoading}
                  errMsg={this.props.tasks.errMsg}
                  successMsg={this.props.tasks.successMsg}
                  comments={this.props.comments}
                  projects={this.props.projects}
                  labels={this.props.labels}
                  auth={this.props.auth}
                  deleteTask={this.props.deleteTask}
                  fetchTasks={this.props.fetchTasks}
                  changeFilter={this.props.changeFilter}
                />
              )}
            ></Route>
            <Route
              exact
              path="/tasks"
              component={() => (
                <AllTasks
                  tasks={this.props.tasks.tasks}
                  isLoading={this.props.tasks.isLoading}
                  errMsg={this.props.tasks.errMsg}
                  successMsg={this.props.tasks.successMsg}
                  projects={this.props.projects}
                  labels={this.props.labels}
                  comments={this.props.comments}
                  auth={this.props.auth}
                  postTask={this.props.postTask}
                  putTask={this.props.putTask}
                  deleteComment={this.props.deleteComment}
                  deleteTask={this.props.deleteTask}
                  deleteAllTasks={this.props.deleteAllTasks}
                />
              )}
            ></Route>
            <Route path="/tasks/:taskId" component={TaskWithId}></Route>
            <Route
              path="/projects"
              component={() => (
                <AllProjectsAndLabels
                  projects={this.props.projects}
                  labels={this.props.labels}
                  postNewProjectOrLabel={this.props.postNewProjectOrLabel}
                  editProject={this.props.editProject}
                  editLabel={this.props.editLabel}
                  deleteProjectOrLabel={this.props.deleteProjectOrLabel}
                />
              )}
            ></Route>
            <Route
              path="/labels"
              component={() => (
                <AllProjectsAndLabels
                  projects={this.props.projects}
                  labels={this.props.labels}
                  postNewProjectOrLabel={this.props.postNewProjectOrLabel}
                  editProject={this.props.editProject}
                  editLabel={this.props.editLabel}
                  deleteProjectOrLabel={this.props.deleteProjectOrLabel}
                />
              )}
            ></Route>
            <Route
              exact
              path="/login"
              component={() => (
                <Login
                  auth={this.props.auth}
                  loginUser={this.props.loginUser}
                />
              )}
            ></Route>
            <Route
              exact
              path="/register"
              component={() => (
                <Register
                  registerUser={this.props.registerUser}
                  auth={this.props.auth}
                />
              )}
            ></Route>
            <Route
              exact
              path="/profile"
              component={() => <Profile auth={this.props.auth} />}
            ></Route>

            <Route
              exact
              path="/logout"
              component={() => <Logout logoutUser={this.props.logoutUser} />}
            ></Route>

            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

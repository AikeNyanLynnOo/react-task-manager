import React from "react";
import Home from "./HomeComponent";
import MenuBar from "./MenuBarComponent";
import TaskDetail from "./TaskDetailComponent";
import AllTasks from "./AllTasksComponent";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchTasks,
  fetchComments,
  fetchLabels,
  fetchProjects,
  loginUser,
  loginWithToken,
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
    fetchTasks: () => dispatch(fetchTasks()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLabels: () => dispatch(fetchLabels()),
    fetchProjects: () => dispatch(fetchProjects()),
    loginUser: (user) => dispatch(loginUser(user)),
    loginWithToken: (token) => dispatch(loginWithToken(token)),
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
                  tasks={this.props.tasks.tasks}
                  isLoading={this.props.tasks.isLoading}
                  errMsg={this.props.tasks.errMsg}
                  comments={this.props.comments}
                  projects={this.props.projects}
                  labels={this.props.labels}
                  auth={this.props.auth}
                  loginWithToken={this.props.loginWithToken}
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
                  projects={this.props.projects}
                  labels={this.props.labels}
                />
              )}
            ></Route>
            <Route path="/tasks/:taskId" component={TaskWithId}></Route>
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
            <Route exact path="/register" component={Register}></Route>
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

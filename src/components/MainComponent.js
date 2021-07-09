import React from "react";
import Home from "./HomeComponent";
import MenuBar from "./MenuBarComponent";
import TaskDetail from "./TaskDetailComponent";
import AllTasks from "./AllTasksComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchTasks,
  fetchComments,
  fetchLabels,
  fetchProjects,
} from "../redux/actions/ActionCreators";
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    comments: state.comments,
    projects: state.projects,
    labels: state.labels,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: () => dispatch(fetchTasks()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLabels: () => dispatch(fetchLabels()),
    fetchProjects: () => dispatch(fetchProjects()),
  };
};
class Main extends React.Component {
  componentDidMount() {
    this.props.fetchTasks();
    this.props.fetchComments();
    this.props.fetchProjects();
    this.props.fetchLabels();
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
        <MenuBar></MenuBar>
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
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

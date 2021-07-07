import React from "react";
import Home from "./HomeComponent";
import MenuBar from "./MenuBarComponent";
import TaskDetail from "./TaskDetailComponent";
import AllTasks from "./AllTasksComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

class Main extends React.Component {
  render() {
    const TaskWithId = ({ match, location, history }) => {
      return (
        <TaskDetail
          task={
            this.props.tasks.filter(
              (task) => task.id === parseInt(match.params.taskId, 10)
            )[0]
          }
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
              component={() => <Home tasks={this.props.tasks} />}
            ></Route>
            <Route
              exact
              path="/tasks"
              component={() => <AllTasks tasks={this.props.tasks} />}
            ></Route>
            <Route path="/tasks/:taskId" component={TaskWithId}></Route>
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));

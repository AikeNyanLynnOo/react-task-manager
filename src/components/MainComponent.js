import React from "react";
import Home from "./HomeComponent";
import MenuBar from "./MenuBarComponent";
import TaskDetail from "./TaskDetailComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import AllTasks from "./AllTasksComponent";

import { tasks } from "../shared/tasks";
class Main extends React.Component {
  render() {
    const TaskWithId = ({ match, location, history }) => {
      return (
        <TaskDetail
          task={tasks.filter(
            (task) => task.id === parseInt(match.params.taskId, 10)
          )[0]}
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
              component={() => <Home tasks={tasks} />}
            ></Route>
            <Route exact path="/tasks" component={AllTasks}></Route>
            <Route path="/tasks/:taskId" component={TaskWithId}></Route>
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;

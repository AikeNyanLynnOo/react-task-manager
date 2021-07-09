import React from "react";
import { Button } from "reactstrap";
import TaskEditModal from "./TaskEditModalComponent";
import TableGenerater from "./TableGeneraterComponent";
import Loading from "./LoadingComponent";
import Error from "./ErrorComponent";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    labels: state.labels,
  };
};

class AllTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.mutateTasks = this.mutateTasks.bind(this);
    this.checkOk = this.checkOk.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  mutateTasks(tasks, projects, labels) {
    return tasks.map((task) => {
      var newTask = task;
      newTask.project = projects.projects.filter(
        (p) => p.id === task.project
      )[0].title;
      newTask.label = labels.labels.filter((l) => l.id === task.label)[0].text;
      return newTask;
    });
  }
  checkOk() {
    if (
      !this.props.isLoading &&
      !this.props.errMsg &&
      !this.props.projects.isLoading &&
      !this.props.projects.errMsg &&
      !this.props.labels.isLoading &&
      !this.props.labels.errMsg
    ) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <div className="row">
        {this.props.isLoading && <Loading />}
        {this.props.errMsg && <Error errMsg={this.props.errMsg} />}
        {this.checkOk() && (
          <div className="col-12">
            <Button className="btn btn-success" onClick={this.toggle}>
              <i className="fa fa-plus"></i>Add Tasks
            </Button>
            <TaskEditModal isOpen={this.state.isOpen} toggle={this.toggle} />
            <hr />
            <h3>All Tasks</h3>
            <TableGenerater
              tasks={this.mutateTasks(
                this.props.tasks,
                this.props.projects,
                this.props.labels
              )}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(AllTasks);

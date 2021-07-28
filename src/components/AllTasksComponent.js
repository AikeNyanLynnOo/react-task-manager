import React from "react";
import { Button } from "reactstrap";
import TaskEditModal from "./TaskEditModalComponent";
import TableGenerater from "./TableGeneraterComponent";
import Loading from "./LoadingComponent";
import Message from "./MessageComponent";
import { Redirect } from "react-router-dom";
import moment from "moment";
class AllTasks extends React.Component {
  constructor(props) {
    super(props);
    // var tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);
    this.state = {
      isOpen: false,
      editing: false,
      title: "",
      project: 0,
      label: 0,
      priority: 1,
      dueDate: moment(moment().add(1, "days")).format("YYYY-MM-DD"),
      dueTime: "",
      remindMe: false,
      progress: 0,
      comments: [],
      comment: "",
      blur: {
        title: false,
        dueDate: false,
      },
    };
    this.toggle = this.toggle.bind(this);
    this.checkOk = this.checkOk.bind(this);
    this.stageEditTask = this.stageEditTask.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validate = this.validate.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
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
  stageEditTask = (row) => {
    const newRow = { ...row };
    newRow.label = this.props.labels.labels.filter(
      (lb) => lb.text === row.label
    )[0].id;
    newRow.project = this.props.projects.projects.filter(
      (pj) => pj.title === row.project
    )[0].id;
    newRow.comments = this.props.comments.comments.filter(
      (cmt) => cmt.taskId === row.id
    );
    this.setState({
      ...this.state,
      ...newRow,
      editing: true,
    });

    this.toggle();
  };

  handleInputChange(event) {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }
  handleBlur = (field) => (event) => {
    this.setState({
      blur: {
        ...this.state.blur,
        [field]: true,
      },
    });
  };
  validate() {
    const errors = {
      title: "",
      dueDate: "",
      btn: false,
    };
    if (this.state.blur.title && this.state.title.length < 3) {
      errors.title = "Too short! Title should contain at least 3 letters";
    }
    if (this.state.blur.title && this.state.title.length > 80) {
      errors.title = "Too long! Give a short and descriptive title";
    }

    if (this.state.blur.title && !this.state.title) {
      errors.title = "Please enter a task title";
    }
    if (errors.title) {
      errors.btn = true;
    }
    if (this.state.blur.dueDate && !this.state.dueDate) {
      errors.dueDate = "Please enter a due date!";
    }
    if (!this.state.title || !this.state.dueDate) {
      errors.btn = true;
    }
    return errors;
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.editing) {
      this.props.putTask(this.state.id, this.state);

      this.setState({
        editing: false,
      });
      return;
    }
    this.props.postTask(this.state, this.props.auth.user.id);
  }
  render() {
    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    const errors = this.validate();
    return (
      <div className="row">
        {this.props.isLoading && <Loading />}
        {this.props.errMsg && <Message msg={this.props.errMsg} type="error" />}
        {this.props.successMsg && (
          <Message msg={this.props.successMsg} type="success" />
        )}
        {this.props.comments.successMsg && (
          <Message msg={this.props.comments.successMsg} type="success" />
        )}
        {this.props.comments.errMsg && (
          <Message
            msg={this.props.comments.errMsg}
            type="error"
            onClick={this.props.remove}
          />
        )}
        {this.checkOk() && (
          <div className="col-12">
            <Button className="btn btn-success" onClick={this.toggle}>
              <i className="fa fa-plus"></i>Add Tasks
            </Button>
            <TaskEditModal
              isOpen={this.state.isOpen}
              toggle={this.toggle}
              task={{ ...this.state }}
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
              handleBlur={this.handleBlur}
              errors={errors}
              validate={this.validate}
              deleteComment={this.props.deleteComment}
            />
            <hr />
            <h3>All Tasks</h3>
            <TableGenerater
              tasks={this.props.tasks}
              stageEditTask={(row) => this.stageEditTask(row)}
              deleteTask={this.props.deleteTask}
              deleteAllTasks={this.props.deleteAllTasks}
              auth={this.props.auth}
            />
          </div>
        )}
      </div>
    );
  }
}

export default AllTasks;

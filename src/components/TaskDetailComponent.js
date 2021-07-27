import React, { Fragment } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Button,
  Input,
  List,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import ToastGenerator from "./ToastGeneratorComponent";
import TaskEditModal from "./TaskEditModalComponent";
import Message from "./MessageComponent";
import Loading from "./LoadingComponent";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};
export const renderComments = (comments, payload) => {
  return (
    <List type="unstyled" className="my-comment-list">
      {comments.map((comment, index) => {
        return (
          <li key={index} className="d-block">
            <Row>
              <Col xs="10">
                <p className="p-3 my-comment d-inline-block mb-0">
                  {comment.text}
                </p>
              </Col>
              <Col xs="2" className="align-self-center">
                {payload && payload.edit && (
                  <i
                    className="fa fa-trash btn"
                    onClick={() => payload.deleteComment(comment.id)}
                  ></i>
                )}
              </Col>
            </Row>
            <code className="d-block mt-0 mb-4 ms-1">
              {moment(comment.date).calendar()};
            </code>
          </li>
        );
      })}
    </List>
  );
};
class TaskDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prev:
        this.props.history.location.state &&
        this.props.history.location.state.prev,
      toastOpen: false,
      isOpen: false,
      editing: true,
      title: "",
      project: "",
      label: "",
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
    this.toggleToast = this.toggleToast.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validate = this.validate.bind(this);
  }
  toggleToast() {
    this.setState({ toastOpen: !this.state.toastOpen });
  }

  toggle(parent) {
    const newTask = this.props.task;
    if (parent) {
      newTask.label = this.props.labels.labels.filter(
        (lb) => lb.text === newTask.label
      )[0].id;
      newTask.project = this.props.projects.projects.filter(
        (pj) => pj.title === newTask.project
      )[0].id;
      this.setState({
        ...this.state,
        ...newTask,
        isOpen: !this.state.isOpen,
      });
    } else {
      newTask.label = this.props.labels.labels.filter(
        (lb) => lb.id === +this.state.label
      )[0].text;
      newTask.project = this.props.projects.projects.filter(
        (pj) => pj.id === +this.state.project
      )[0].title;
      this.setState({
        ...this.state,
        ...this.props.newTask,
        isOpen: !this.state.isOpen,
      });
    }
  }
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
    this.props.putTask(this.state.id, this.state);
  }
  render() {
    const task = this.props.task;

    const errors = this.validate();
    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/login" />;
    } else if (task) {
      const comments =
        task &&
        this.props.comments.comments.filter((cmt) => cmt.taskId === task.id);
      task.comments = comments;
      return (
        <Fragment>
          {this.props.isLoading && <Loading />}
          {this.props.errMsg && (
            <Message msg={this.props.errMsg} type="error" />
          )}
          {this.props.successMsg && (
            <Message msg={this.props.successMsg} type="success" />
          )}
          {this.props.comments.successMsg && (
            <Message msg={this.props.comments.successMsg} type="success" />
          )}
          {this.props.comments.errMsg && (
            <Message msg={this.props.comments.errMsg} type="error" />
          )}
          <ToastGenerator
            toastOpen={this.state.toastOpen}
            toggleToast={this.toggleToast}
            selected={task}
          />
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
          <Row>
            {this.state.prev && (
              <Col lg={8} className="mx-auto">
                <Breadcrumb className="my-breadcrumb">
                  <BreadcrumbItem>
                    {this.state.prev && this.state.prev === "/home" && (
                      <Link to="/home">Home</Link>
                    )}
                    {this.state.prev && this.state.prev === "/tasks" && (
                      <Link
                        to={{
                          pathname: `/tasks`,
                        }}
                      >
                        Tasks
                      </Link>
                    )}
                  </BreadcrumbItem>
                  <BreadcrumbItem active>{task.title}</BreadcrumbItem>
                </Breadcrumb>
              </Col>
            )}

            <Col lg={8} className="mx-auto">
              <Card>
                <CardBody>
                  <CardTitle tag="h5" className="my-3">
                    <Input
                      type="checkbox"
                      name="completeTask"
                      id="completeTask"
                      className="me-3"
                      checked={this.state.toastOpen}
                      onChange={this.toggleToast}
                    ></Input>
                    {task.title}
                  </CardTitle>
                  <CardSubtitle tag="h6" className="my-3">
                    <span className="badge bg-primary me-1">
                      Priority-{this.props.task.priority}
                    </span>
                    {this.props.task.label && (
                      <span className="badge bg-primary me-1">
                        Label-
                        {this.props.task.label}
                      </span>
                    )}
                    {this.props.task.project && (
                      <span className="badge bg-primary me-1">
                        Project-
                        {this.props.task.project}
                      </span>
                    )}
                  </CardSubtitle>
                  <Row className="my-3">
                    <Col md={5} className="mb-2">
                      <span>
                        <i className="fa fa-calendar"></i>{" "}
                        {moment(this.props.task.dueDate).format("MMM Do YY")}{" "}
                      </span>
                      <span>
                        <i className="fa fa-comment"></i> {comments.length}
                      </span>
                    </Col>
                    <Col md={{ size: 5, offset: 2 }} className="text-sm-end">
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => this.toggle(true)}
                      >
                        <i className="fa fa-pencil"></i>
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <h6>Comments</h6>
                    {renderComments(comments)}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Fragment>
      );
    } else {
      return <></>;
    }
  }
}

export default connect(mapStateToProps)(TaskDetail);

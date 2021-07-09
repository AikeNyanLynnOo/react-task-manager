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
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    labels: state.labels,
    projects: state.projects,
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
              {comment.date}, {comment.time}
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
      prev: this.props.history.location.state.prev,
      toastOpen: false,
      isOpen: false,
    };
    this.toggleToast = this.toggleToast.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggleToast() {
    this.setState({ toastOpen: !this.state.toastOpen });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const task = this.props.task;
    const comments =
      task &&
      this.props.comments.comments.filter((cmt) => cmt.taskId === task.id);
    const label =
      task && this.props.labels.labels.filter((lb) => lb.id === task.label)[0];
    const project =
      task &&
      this.props.projects.projects.filter((lb) => lb.id === task.project)[0];
    if (task) {
      return (
        <Fragment>
          <ToastGenerator
            toastOpen={this.state.toastOpen}
            toggleToast={this.toggleToast}
            selected={task}
          />
          <TaskEditModal
            isOpen={this.state.isOpen}
            toggle={this.toggle}
            task={task}
          />
          <Row>
            <Col lg={8} className="mx-auto">
              <Breadcrumb className="my-breadcrumb">
                <BreadcrumbItem>
                  {this.state.prev && this.state.prev === "/home" && (
                    <Link to="/home">Home</Link>
                  )}
                  {this.state.prev && this.state.prev === "/tasks" && (
                    <Link to="/tasks">Tasks</Link>
                  )}
                </BreadcrumbItem>
                <BreadcrumbItem active>{task.title}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
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
                        {label && label.text}
                      </span>
                    )}
                    {this.props.task.project && (
                      <span className="badge bg-primary me-1">
                        Project-
                        {project && project.title}
                      </span>
                    )}
                  </CardSubtitle>
                  <Row className="my-3">
                    <Col md={5} className="mb-2">
                      <span>
                        <i className="fa fa-calendar"></i>{" "}
                        {this.props.task.dueDate}{" "}
                      </span>
                      <span>
                        <i className="fa fa-comment"></i> {comments.length}
                      </span>
                    </Col>
                    <Col md={{ size: 5, offset: 2 }} className="text-sm-end">
                      <Button color="primary" size="sm" onClick={this.toggle}>
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

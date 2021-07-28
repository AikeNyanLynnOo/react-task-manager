import React, { Fragment } from "react";
import { Row, Col, Card, CardTitle, CardBody, List, Button } from "reactstrap";
import { Link } from "react-router-dom";
import TaskItemPreview from "./TaskItemPreviewComponent";
import Loading from "./LoadingComponent";
import Message from "./MessageComponent";
import { Redirect } from "react-router-dom";
import moment from "moment";
class Home extends React.Component {
  render() {
    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <Fragment>
        {this.props.isLoading && <Loading />}
        {this.props.errMsg && <Message msg={this.props.errMsg} type="error" />}
        {this.props.successMsg && (
          <Message msg={this.props.successMsg} type="success" />
        )}

        {!this.props.isLoading && !this.props.errMsg && (
          <Fragment>
            <Row>
              <Col lg={{ size: 3 }}>
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">Today Tasks</CardTitle>
                    <hr className="mb-0" />
                    <List type="unstyled" className="my-task-list">
                      {!this.props.comments.isLoading &&
                      !this.props.comments.errMsg &&
                      !this.props.labels.isLoading &&
                      !this.props.labels.errMsg &&
                      !this.props.projects.isLoading &&
                      !this.props.projects.errMsg &&
                      !this.props.isLoading &&
                      !this.props.errMsg &&
                      this.props.tasks.filter((task) =>
                        moment(task.dueDate).isSame(moment(), "day")
                      ).length > 0 ? (
                        this.props.tasks
                          .filter((task) =>
                            moment(task.dueDate).isSame(moment(), "day")
                          )
                          .map((task) => {
                            return (
                              <TaskItemPreview
                                key={task.id}
                                task={task}
                                taskLabel={task.label}
                                taskProject={task.project}
                                cmtCount={
                                  this.props.comments.comments.filter(
                                    (cmt) => cmt.taskId === task.id
                                  ).length
                                }
                                deleteTask={this.props.deleteTask}
                                auth={this.props.auth}
                              />
                            );
                          })
                      ) : (
                        <span>No tasks available!</span>
                      )}
                    </List>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={{ size: 3 }} className="mt-4 mt-lg-0">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">Tomorrow Tasks</CardTitle>
                    <hr className="mb-0" />
                    <List type="unstyled" className="my-task-list">
                      {!this.props.comments.isLoading &&
                      !this.props.comments.errMsg &&
                      !this.props.labels.isLoading &&
                      !this.props.labels.errMsg &&
                      !this.props.projects.isLoading &&
                      !this.props.projects.errMsg &&
                      !this.props.isLoading &&
                      !this.props.errMsg &&
                      this.props.tasks.filter((task) =>
                        moment(task.dueDate).isSame(
                          moment(moment().add(1, "days")),
                          "day"
                        )
                      ).length > 0 ? (
                        this.props.tasks
                          .filter((task) =>
                            moment(task.dueDate).isSame(
                              moment(moment().add(1, "days")),
                              "day"
                            )
                          )
                          .map((task) => {
                            return (
                              <TaskItemPreview
                                key={task.id}
                                task={task}
                                taskLabel={task.label}
                                taskProject={task.project}
                                cmtCount={
                                  this.props.comments.comments.filter(
                                    (cmt) => cmt.taskId === task.id
                                  ).length
                                }
                                deleteTask={this.props.deleteTask}
                                auth={this.props.auth}
                              />
                            );
                          })
                      ) : (
                        <span>No tasks available!</span>
                      )}
                    </List>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={{ size: 3 }} className="mt-4 mt-lg-0">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">Before weekend</CardTitle>
                    <hr className="mb-0" />
                    <List type="unstyled" className="my-task-list">
                      {!this.props.comments.isLoading &&
                      !this.props.comments.errMsg &&
                      !this.props.labels.isLoading &&
                      !this.props.labels.errMsg &&
                      !this.props.projects.isLoading &&
                      !this.props.projects.errMsg &&
                      !this.props.isLoading &&
                      !this.props.errMsg &&
                      this.props.tasks.filter(
                        (task) =>
                          moment(task.dueDate).isAfter(
                            moment(moment().add(1, "days")),
                            "day"
                          ) &&
                          moment(task.dueDate).isBefore(
                            moment().endOf("isoWeek")
                          )
                      ).length > 0 ? (
                        this.props.tasks
                          .filter(
                            (task) =>
                              moment(task.dueDate).isAfter(
                                moment(moment().add(1, "days")),
                                "day"
                              ) &&
                              moment(task.dueDate).isBefore(
                                moment().endOf("isoWeek")
                              )
                          )
                          .map((task) => {
                            return (
                              <TaskItemPreview
                                key={task.id}
                                task={task}
                                taskLabel={task.label}
                                taskProject={task.project}
                                cmtCount={
                                  this.props.comments.comments.filter(
                                    (cmt) => cmt.taskId === task.id
                                  ).length
                                }
                                deleteTask={this.props.deleteTask}
                                auth={this.props.auth}
                              />
                            );
                          })
                      ) : (
                        <span>No tasks available!</span>
                      )}
                    </List>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={{ size: 3 }} className="mt-4 mt-lg-0">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">All to do this month</CardTitle>
                    <hr className="mb-0" />
                    <List type="unstyled" className="my-task-list">
                      {!this.props.comments.isLoading &&
                      !this.props.comments.errMsg &&
                      !this.props.labels.isLoading &&
                      !this.props.labels.errMsg &&
                      !this.props.projects.isLoading &&
                      !this.props.projects.errMsg &&
                      !this.props.isLoading &&
                      !this.props.errMsg &&
                      this.props.tasks.filter((task) =>
                        moment(task.dueDate).isSame(moment(), "month")
                      ).length > 0 ? (
                        this.props.tasks
                          .filter((task) =>
                            moment(task.dueDate).isSame(moment(), "month")
                          )
                          .map((task) => {
                            return (
                              <TaskItemPreview
                                key={task.id}
                                task={task}
                                taskLabel={task.label}
                                taskProject={task.project}
                                cmtCount={
                                  this.props.comments.comments.filter(
                                    (cmt) => cmt.taskId === task.id
                                  ).length
                                }
                                deleteTask={this.props.deleteTask}
                                auth={this.props.auth}
                              />
                            );
                          })
                      ) : (
                        <span>No tasks available!</span>
                      )}
                    </List>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm={12} className="text-center mt-3 d-grid d-sm-inline">
                <Link to="/tasks" className="my-link">
                  <Button color="outline-primary" size="md">
                    See All
                  </Button>
                </Link>
              </Col>
            </Row>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Home;

import React, { Fragment } from "react";
import { Row, Col, Card, CardTitle, CardBody, List, Button } from "reactstrap";
import { Link } from "react-router-dom";
import TaskItemPreview from "./TaskItemPreviewComponent";
import Loading from "./LoadingComponent";
import Message from "./MessageComponent";
import { Redirect } from "react-router-dom";
class Home extends React.Component {
  render() {
    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <Fragment>
        {this.props.isLoading && <Loading />}
        {this.props.errMsg && <Message msg={this.props.errMsg} type="error" />}
        {!this.props.isLoading && !this.props.errMsg && (
          <Row>
            <Col lg={{ size: 4, offset: 2 }}>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Active Tasks</CardTitle>
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
                      this.props.tasks
                        .filter((task) => task.progress > 0)
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
                            />
                          );
                        })}
                  </List>
                </CardBody>
              </Card>
            </Col>
            <Col lg={{ size: 4 }} className="mt-4 mt-lg-0">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Upcoming Tasks</CardTitle>
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
                      this.props.tasks
                        .filter((task) => !task.progress > 0)
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
                            />
                          );
                        })}
                  </List>
                </CardBody>
              </Card>
            </Col>
            <Col sm={12} className="text-center mt-3 d-grid d-sm-inline">
              <Link to="/tasks" className="my-link">
                <Button color="outline-primary" size="md">
                  See All
                </Button>
              </Link>
            </Col>
          </Row>
        )}
      </Fragment>
    );
  }
}

export default Home;

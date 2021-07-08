import React, { Fragment } from "react";
import { Row, Col, Card, CardTitle, CardBody, List, Button } from "reactstrap";
import { Link } from "react-router-dom";
import TaskItemPreview from "./TaskItemPreviewComponent";
import Loading from "./LoadingComponent";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    projects: state.projects,
    labels: state.labels,
  };
};
class Home extends React.Component {
  render() {
    return (
      <Fragment>
        {this.props.isLoading && <Loading />}
        {!this.props.isLoading && (
          <Row>
            <Col lg={{ size: 4, offset: 2 }}>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Active Tasks</CardTitle>
                  <hr className="mb-0" />
                  <List type="unstyled" className="my-task-list">
                    {this.props.tasks
                      .filter((task) => task.progress > 0)
                      .map((task) => {
                        return (
                          <TaskItemPreview
                            key={task.id}
                            task={task}
                            taskLabel={
                              this.props.labels.filter(
                                (lb) => lb.id === task.label
                              )[0].text
                            }
                            taskProject={
                              this.props.projects.filter(
                                (pj) => pj.id === task.project
                              )[0].title
                            }
                            cmtCount={
                              this.props.comments.filter(
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
                    {this.props.tasks
                      .filter((task) => !task.progress > 0)
                      .map((task) => {
                        return (
                          <TaskItemPreview
                            key={task.id}
                            task={task}
                            taskLabel={
                              this.props.labels.filter(
                                (lb) => lb.id === task.label
                              )[0].text
                            }
                            taskProject={
                              this.props.projects.filter(
                                (pj) => pj.id === task.project
                              )[0].title
                            }
                            cmtCount={
                              this.props.comments.filter(
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

export default connect(mapStateToProps)(Home);

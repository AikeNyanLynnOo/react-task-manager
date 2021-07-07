import React, { Fragment } from "react";
import { Row, Col, Card, CardTitle, CardBody, List, Button } from "reactstrap";
import { Link } from "react-router-dom";
import TaskItemPreview from "./TaskItemPreviewComponent";
class Home extends React.Component {
  render() {
    return (
      <Fragment>
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
                      return <TaskItemPreview task={task} key={task.id} />;
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
                      return <TaskItemPreview task={task} key={task.id} />;
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
      </Fragment>
    );
  }
}

export default Home;

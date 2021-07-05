import React from "react";
import { Row, Col, Card, CardTitle, CardBody, List } from "reactstrap";
import TaskItemPreview from "./TaskItemPreview";

class Home extends React.Component {
  render() {
    return (
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
                    return <TaskItemPreview task={task} />;
                  })}
              </List>
            </CardBody>
          </Card>
        </Col>
        <Col lg={{ size: 4 }}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Upcoming Tasks</CardTitle>
              <hr className="mb-0" />
              <List type="unstyled" className="my-task-list">
                {this.props.tasks
                  .filter((task) => !task.progress > 0)
                  .map((task) => {
                    return <TaskItemPreview task={task} />;
                  })}
              </List>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Home;

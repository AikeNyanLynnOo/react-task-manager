import React, { Fragment } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Button,
  ButtonGroup,
  Input,
  List,
} from "reactstrap";

class TaskDetail extends React.Component {
  renderComments = (comments) => {
    return (
      <List type="unstyled">
        {comments.map((comment) => {
          return <li className="p-3 my-3 my-comment">{comment}</li>;
        })}
      </List>
    );
  };

  render() {
    return (
      <Row>
        <Col lg={8} className="mx-auto">
          <Card>
            <CardBody>
              <CardTitle tag="h5" className="my-3">
                {this.props.task.title}{" "}
                <Input
                  type="checkbox"
                  name="completeTask"
                  id="completeTask"
                  className="ms-3"
                ></Input>
              </CardTitle>
              <CardSubtitle tag="h6" className="my-3">
                <span className="badge bg-primary me-1">
                  {this.props.task.priority}
                </span>
                {this.props.task.label && (
                  <span className="badge bg-primary me-1">
                    {this.props.task.label}
                  </span>
                )}
                {this.props.task.project && (
                  <span className="badge bg-primary me-1">
                    {this.props.task.project}
                  </span>
                )}
              </CardSubtitle>
              <Row className="my-3">
                <Col md={5}>
                  <span>
                    <i className="fa fa-calendar"></i> {this.props.task.dueDate}{" "}
                  </span>
                  <span>
                    <i className="fa fa-comment"></i>{" "}
                    {this.props.task.comments.length}
                  </span>
                </Col>
                <Col md={{ size: 5, offset: 2 }} className="text-end">
                  <ButtonGroup size="sm">
                    <Button color="primary">
                      <i className="fa fa-pencil"></i>
                    </Button>
                    <Button color="danger">
                      <i className="fa fa-trash"></i>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <hr />
              <Row>
                <h6>Comments</h6>
                {this.renderComments(this.props.task.comments)}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default TaskDetail;

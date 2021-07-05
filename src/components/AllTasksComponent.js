import React, { Fragment } from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class AllTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-9">
          <Button className="btn btn-success" onClick={this.toggle}>
            <i className="fa fa-plus"></i>Add Tasks
          </Button>
          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggle}
            className="modal-lg"
          >
            <ModalHeader toggle={this.toggle}>Add New Task</ModalHeader>
            <ModalBody>
              {/* task title
                task description
                project
                label
                priority
                comment
                due date 
                progress
                remindMe
                */}
              <Form>
                <FormGroup row className="mt-3">
                  <Label for="title" sm={2}>
                    Title
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Task Title"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-3">
                  <Label for="project" sm={2}>
                    Project
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="project"
                      id="project"
                      className="form-select"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-3">
                  <Label for="label" sm={2}>
                    Label
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="label"
                      id="label"
                      className="form-select"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-3">
                  <Col sm={2}>
                    <Label>Priority</Label>
                  </Col>
                  <Col>
                    <div>
                      <Label for="p1">1</Label>
                      <Input
                        type="radio"
                        name="priority"
                        id="p1"
                        className="ms-1 me-3"
                      />
                      <Label for="p2">2</Label>
                      <Input
                        type="radio"
                        name="priority"
                        id="p2"
                        className="ms-1 me-3"
                      />
                      <Label for="p3">3</Label>
                      <Input
                        type="radio"
                        name="priority"
                        id="p3"
                        className="ms-1 me-3"
                      />
                      <Label for="p4">4</Label>
                      <Input
                        type="radio"
                        name="priority"
                        id="p4"
                        className="ms-1 me-3"
                      />
                      <Label for="p5">5</Label>
                      <Input
                        type="radio"
                        name="priority"
                        id="p5"
                        className="ms-1 me-3"
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-3">
                  <Label for="dueDate" sm={2}>
                    Due
                  </Label>
                  <Col sm={3} className="mt-3 mt-sm-0">
                    <Input type="date" name="dueDate" id="dueDate" />
                  </Col>
                  <Col sm={3} className="mt-3 mt-sm-0">
                    <Input type="time" name="dueTime" id="dueTime" />
                  </Col>
                  <Col
                    sm={{ size: 3, offset: 1 }}
                    className="text-sm-end mt-3 mt-sm-0"
                  >
                    <Label check>
                      Remind Me?
                      <Input
                        type="checkbox"
                        name="remindMe"
                        id="remindMe"
                        className="ms-2"
                      />
                    </Label>
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-3">
                  <Label for="comment" sm={2}>
                    Comment
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="textarea"
                      name="comment"
                      id="comment"
                      rows="6"
                    />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button className="btn btn-danger" onClick={this.toggle}>
                Cancel
              </Button>
              <Button className="btn btn-primary" onClick={this.toggle}>
                Save
              </Button>
            </ModalFooter>
          </Modal>

          <hr />
          <h3>All Tasks</h3>
        </div>
      </div>
    );
  }
}

export default AllTasks;

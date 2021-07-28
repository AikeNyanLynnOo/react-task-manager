import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { renderComments } from "./TaskDetailComponent";
import { connect } from "react-redux";

import moment from "moment";

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    labels: state.labels,
    projects: state.projects,
  };
};

class TaskEditModal extends React.Component {
  renderRadios = () => {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((no) => {
          return (
            <Fragment key={no}>
              <Label for={`p${no}`}>{no}</Label>
              <Input
                type="radio"
                name="priority"
                id={`p${no}`}
                className="ms-1 me-3"
                value={no}
                defaultChecked={this.props.task.priority === no}
                onChange={this.props.handleInputChange}
              />
            </Fragment>
          );
        })}
      </div>
    );
  };
  render() {
    const comments =
      this.props.task &&
      this.props.comments.comments.filter(
        (cmt) => cmt.taskId === this.props.task.id
      );

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.props.toggle()}
        className="modal-lg"
      >
        <ModalHeader toggle={() => this.props.toggle()}>
          Add New Task
        </ModalHeader>
        <ModalBody>
          <Form id="my-form" onSubmit={this.props.handleSubmit}>
            <FormGroup row className="mt-3">
              <Label for="title" sm={2}>
                Title (Req.)
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  valid={this.props.errors.title === ""}
                  invalid={this.props.errors.title !== ""}
                  onBlur={this.props.handleBlur("title")}
                  value={this.props.task.title}
                  onChange={this.props.handleInputChange}
                />
                <FormFeedback>{this.props.errors.title}</FormFeedback>
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
                  value={this.props.task.project}
                  onChange={this.props.handleInputChange}
                >
                  {this.props.projects.projects.map((pj, index) => {
                    return (
                      <option value={pj.id} key={index}>
                        {pj.title}
                      </option>
                    );
                  })}
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
                  value={this.props.task.label}
                  onChange={this.props.handleInputChange}
                >
                  {this.props.labels.labels.map((lb, index) => {
                    return (
                      <option value={lb.id} key={index}>
                        {lb.text}
                      </option>
                    );
                  })}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row className="mt-3">
              <Col sm={2}>
                <Label>Priority</Label>
              </Col>
              <Col>{this.renderRadios()}</Col>
            </FormGroup>
            <FormGroup row className="mt-3">
              <Label for="dueDate" sm={2}>
                Due (Date Req.)
              </Label>
              <Col sm={4} className="mt-3 mt-sm-0">
                <Input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  min={moment().format("YYYY-MM-DD")}
                  valid={this.props.errors.dueDate === ""}
                  invalid={this.props.errors.dueDate !== ""}
                  onBlur={this.props.handleBlur("dueDate")}
                  value={this.props.task.dueDate}
                  onChange={this.props.handleInputChange}
                />
                <FormFeedback>{this.props.errors.dueDate}</FormFeedback>
              </Col>
              <Col sm={3} className="mt-3 mt-sm-0">
                <Input
                  type="time"
                  name="dueTime"
                  id="dueTime"
                  value={this.props.task.dueTime}
                  onChange={this.props.handleInputChange}
                />
              </Col>
              <Col sm={{ size: 3 }} className="text-sm-end mt-3 mt-sm-0">
                <Label check>
                  Remind Me?
                  <Input
                    type="checkbox"
                    name="remindMe"
                    id="remindMe"
                    className="ms-2"
                    checked={this.props.task.remindMe}
                    onChange={this.props.handleInputChange}
                  />
                </Label>
              </Col>
            </FormGroup>

            {this.props.task.editing && (
              <FormGroup row className="mt-3">
                <Col sm="2">
                  <Label for="progress">Progress</Label>
                </Col>
                <Col sm="8">
                  <Input
                    type="range"
                    className="form-range"
                    id="progress"
                    name="progress"
                    value={this.props.task.progress}
                    onChange={this.props.handleInputChange}
                  />
                </Col>
                <Col sm="2" className="text-end">
                  <strong>{this.props.task.progress}%</strong>
                </Col>
              </FormGroup>
            )}

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
                  value={this.props.task.comment}
                  onChange={this.props.handleInputChange}
                />
              </Col>
            </FormGroup>
            {this.props.task.comments.length > 0 && (
              <Fragment>
                <hr />
                <h6>Previous Comments</h6>
                {renderComments(comments, {
                  edit: true,
                  deleteComment: (id) => {
                    this.props.deleteComment(id);
                    this.props.toggle();
                  },
                })}
              </Fragment>
            )}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-danger"
            onClick={() => this.props.toggle()}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-primary"
            type="submit"
            form="my-form"
            onClick={() => this.props.toggle()}
            disabled={this.props.errors.btn}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(TaskEditModal);

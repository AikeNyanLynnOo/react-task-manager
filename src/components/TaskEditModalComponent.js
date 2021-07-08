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

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    labels: state.labels,
    projects: state.projects,
  };
};

class TaskEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: (props.task && props.task.title) || null,
      project: (props.task && props.task.project) || null,
      label: (props.task && props.task.label) || null,
      priority: (props.task && props.task.priority) || null,
      dueDate: (props.task && props.task.dueDate) || null,
      dueTime: (props.task && props.task.dueTime) || "",
      remindMe: (props.task && props.task.remindMe) || null,
      progress: (props.task && props.task.progress) || null,
      comments: (props.task && props.task.comments) || null,
      comment: "",
      blur: {
        title: false,
        dueDate: false,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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
    console.log(this.state);
  }

  handleBlur = (field) => (event) => {
    this.setState({
      blur: {
        ...this.state.blur,
        [field]: true,
      },
    });
  };
  handleSubmit(event) {
    event.preventDefault();
    alert(JSON.stringify(this.state));
  }
  validate(title) {
    const errors = {
      title: "",
      dueDate: "",
      btn: false,
    };
    if (title) {
      if (this.state.blur.title && title.length < 3) {
        errors.title = "Too short! Title should contain at least 3 letters";
      }
      if (this.state.blur.title && title.length > 80) {
        errors.title = "Too long! Give a short and descriptive title";
      }
      if (errors.title) {
        errors.btn = true;
      }
      return errors;
    } else {
      if (!this.state.title || !this.state.dueDate) {
        return true;
      }
    }
  }
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
                defaultChecked={this.state.priority === no}
                onChange={this.handleInputChange}
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
      this.props.comments.filter((cmt) => cmt.taskId === this.props.task.id);
    const errors = this.validate(this.state.title, this.state.dueDate);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className="modal-lg"
      >
        <ModalHeader toggle={this.props.toggle}>Add New Task</ModalHeader>
        <ModalBody>
          <Form id="my-form" onSubmit={this.handleSubmit}>
            <FormGroup row className="mt-3">
              <Label for="title" sm={2}>
                Title (Req.)
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  value={this.state.title}
                  valid={errors.title === ""}
                  invalid={errors.title !== ""}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur("title")}
                />
                <FormFeedback>{errors.title}</FormFeedback>
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
                  value={this.state.project}
                  onChange={this.handleInputChange}
                >
                  {this.props.projects.map((pj, index) => {
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
                  value={this.state.label}
                  onChange={this.handleInputChange}
                >
                  {this.props.labels.map((lb, index) => {
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
              <Col sm={3} className="mt-3 mt-sm-0">
                <Input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={this.state.dueDate}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.dueDate}</FormFeedback>
              </Col>
              <Col sm={3} className="mt-3 mt-sm-0">
                <Input
                  type="time"
                  name="dueTime"
                  id="dueTime"
                  value={this.state.dueTime}
                  onChange={this.handleInputChange}
                />
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
                    checked={this.state.remindMe}
                    onChange={this.handleInputChange}
                  />
                </Label>
              </Col>
            </FormGroup>

            {this.props.task && (
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
                    value={this.state.progress}
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col sm="2">
                  <strong>{this.state.progress}%</strong>
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
                  value={this.state.comment}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            {this.props.task && (
              <Fragment>
                <hr />
                <h6>Previous Comments</h6>
                {renderComments(comments, {
                  edit: true,
                  deleteComment: (id) => {
                    alert(`Deleted comment with id ${id}`);
                  },
                })}
              </Fragment>
            )}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-danger" onClick={this.props.toggle}>
            Cancel
          </Button>
          <Button
            className="btn btn-primary"
            type="submit"
            form="my-form"
            onClick={this.props.toggle}
            disabled={errors.btn || this.validate()}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(TaskEditModal);

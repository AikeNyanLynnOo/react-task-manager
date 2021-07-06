import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";
import { renderComments } from "./TaskDetailComponent";
function TaskEditModal({ isOpen, toggle, task }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
      <ModalHeader toggle={toggle}>Add New Task</ModalHeader>
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
                value={task && task.title}
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
                {["Project 1", "Project 2", "Project 3"].map((pj) => {
                  return (
                    <option value={pj} selected={task && pj === task.project}>
                      {pj}
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
              >
                {["label 1", "label 2", "label 3"].map((lb) => {
                  return (
                    <option value={lb} selected={task && lb === task.label}>
                      {lb}
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
            <Col>
              <div>
                <Label for="p1">1</Label>
                <Input
                  type="radio"
                  name="priority"
                  id="p1"
                  className="ms-1 me-3"
                  checked={task && task.priority === 1}
                />
                <Label for="p2">2</Label>
                <Input
                  type="radio"
                  name="priority"
                  id="p2"
                  className="ms-1 me-3"
                  checked={task && task.priority === 2}
                />
                <Label for="p3">3</Label>
                <Input
                  type="radio"
                  name="priority"
                  id="p3"
                  className="ms-1 me-3"
                  checked={task && task.priority === 3}
                />
                <Label for="p4">4</Label>
                <Input
                  type="radio"
                  name="priority"
                  id="p4"
                  className="ms-1 me-3"
                  checked={task && task.priority === 4}
                />
                <Label for="p5">5</Label>
                <Input
                  type="radio"
                  name="priority"
                  id="p5"
                  className="ms-1 me-3"
                  checked={task && task.priority === 5}
                />
              </div>
            </Col>
          </FormGroup>
          <FormGroup row className="mt-3">
            <Label for="dueDate" sm={2}>
              Due
            </Label>
            <Col sm={3} className="mt-3 mt-sm-0">
              <Input
                type="date"
                name="dueDate"
                id="dueDate"
                value={task && task.dueDate}
              />
            </Col>
            <Col sm={3} className="mt-3 mt-sm-0">
              <Input
                type="time"
                name="dueTime"
                id="dueTime"
                value={task && task.dueTime}
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
                  checked={task && task.remindMe}
                />
              </Label>
            </Col>
          </FormGroup>

          <FormGroup row className="mt-3">
            <Label for="comment" sm={2}>
              Comment
            </Label>
            <Col sm={10}>
              <Input type="textarea" name="comment" id="comment" rows="6" />
            </Col>
          </FormGroup>
          <hr/>
          <Row>
            <Col sm={{ offset: 2 }}>
              <h6>Previous Comments</h6>
            </Col>
            <Col sm={{ offset: 2 }}>
              {task && renderComments(task.comments)}
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="btn btn-danger" onClick={toggle}>
          Cancel
        </Button>
        <Button className="btn btn-primary" onClick={toggle}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default TaskEditModal;

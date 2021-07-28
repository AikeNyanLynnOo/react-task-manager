import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Col,
  Button,
  Input,
} from "reactstrap";

const AddLabelsProjects = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      toggle={() => props.toggle()}
      className="modal-md"
    >
      <ModalHeader toggle={() => props.toggle()}>
        Add New {props.type === "project" ? "Project" : "Label"}
      </ModalHeader>
      <ModalBody>
        <Form id="my-form" onSubmit={props.handleSubmit}>
          <FormGroup row className="mt-3">
            <Label for="title" sm={2}>
              {props.type === "project" ? "Project title" : "Label title"}
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                placeholder={
                  props.type === "project"
                    ? "Eg. Frontend development"
                    : "Eg. Important"
                }
                onChange={props.handleInputChange}
              />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="btn btn-danger" onClick={() => props.toggle()}>
          Cancel
        </Button>
        <Button
          className="btn btn-primary"
          type="submit"
          form="my-form"
          onClick={() => props.toggle()}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddLabelsProjects;

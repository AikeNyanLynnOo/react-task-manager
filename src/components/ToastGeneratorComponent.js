import { Row, Col, Button, Toast } from "reactstrap";
function ToastGenerator(props) {
  return (
    <Toast isOpen={props.toastOpen} className="bg-light my-toast">
      <Row className="bg-warning mt-0 mx-0 py-2 px-1">
        <Col xs={10}>
          <h6 className="text-white">Be careful! </h6>
        </Col>
        <Col xs={2}>
          <Button
            className="bg-light btn-close"
            onClick={props.toggleToast}
          ></Button>
        </Col>
      </Row>
      <Row className="px-3 pt-3">
        <p>
          Have you completed{" "}
          <strong>{props.selected && props.selected.title}</strong> ?
        </p>
      </Row>
      <div className="text-end pb-3 pe-3">
        <Button color="light" size="sm" onClick={props.toggleToast}>
          cancel
        </Button>
        <Button
          color="info"
          size="sm"
          onClick={() => {
            if (props.selected.title !== "All Tasks") {
              console.log("deleting task with " + props.selected.id);
              props.deleteTask(props.selected.id, props.auth.user.id);
              props.toggleToast();
            } else {
              props.deleteAllTasks && props.deleteAllTasks(props.auth);
              props.toggleToast();
            }
          }}
        >
          Yes
        </Button>
      </div>
    </Toast>
  );
}

export default ToastGenerator;

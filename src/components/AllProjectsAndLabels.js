import React from "react";
import { Button } from "reactstrap";
import AddLabelsProjectsModal from "./AddLabelsProjectsModal";
class AllProjectsAndLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      type: "",
    };
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggle(type) {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.type === "project") {
      this.props.postNewProjectOrLabel("projects", this.state.title);
    } else {
      this.props.postNewProjectOrLabel("labels", this.state.title);
    }
  }
  render() {
    return (
      <>
        <AddLabelsProjectsModal
          isOpen={this.state.isOpen}
          type={this.state.type}
          toggle={this.toggle}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
        />
        <Button
          onClick={() => {
            this.toggle("project");
            this.setState({
              type: "project",
            });
          }}
        >
          Add new Project
        </Button>
        <Button
          onClick={() => {
            this.toggle("label");
            this.setState({
              type: "label",
            });
          }}
        >
          Add new Label
        </Button>
        {JSON.stringify(this.props.projects)}
        {JSON.stringify(this.props.labels)}
      </>
    );
  }
}

export default AllProjectsAndLabels;

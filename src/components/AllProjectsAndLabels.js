import React from "react";
import { Button } from "reactstrap";
import AddLabelsProjectsModal from "./AddLabelsProjectsModal";
import moment from "moment";
class AllProjectsAndLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      type: "",
    };
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.type === "project") {
      this.props.postNewProjectOrLabel(
        this.props.auth.user.id,
        "projects",
        this.state.title
      );
    } else {
      this.props.postNewProjectOrLabel(
        this.props.auth.user.id,
        "labels",
        this.state.title
      );
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

        <div className="container">
          <div className="row d-flex-justify-content-between">
            <ul className="col-md-4 offset-md-2 lb-pj-list p-3">
              <div className="d-flex justify-content-between">
                <h3>Projects</h3>{" "}
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
              </div>
              {this.props.projects.projects.map((pj) => (
                <li className="lb-pj-list-item my-2 p-3" key={pj.id}>
                  <div className="d-flex justify-content-between ">
                    <span
                      id={"pj" + pj.id.toString() + pj.title}
                      style={{ display: "block" }}
                    >
                      {pj.title}
                    </span>
                    <input
                      type="text"
                      name="editTitle"
                      value={this.state.editTitle}
                      id={"pj" + pj.id}
                      style={{ display: "none" }}
                      onChange={this.handleChange}
                      autoFocus={true}
                    />
                    <div>
                      <button
                        id={"pj" + pj.title + pj.id.toString()}
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => {
                          if (
                            document.getElementById(
                              "pj" + pj.id.toString() + pj.title
                            ).style.display === "block"
                          ) {
                            document.getElementById(
                              "pj" + pj.id
                            ).style.display = "block";

                            document.getElementById(
                              "pj" + pj.id.toString() + pj.title
                            ).style.display = "none";
                            document
                              .getElementById(
                                "pj" + pj.title + pj.id.toString()
                              )
                              .children[0].classList.remove("fa-pencil");
                            document
                              .getElementById(
                                "pj" + pj.title + pj.id.toString()
                              )
                              .children[0].classList.add("fa-check");
                            document
                              .getElementById(
                                "pj" + pj.title + pj.id.toString()
                              )
                              .classList.remove("btn-primary");
                            document
                              .getElementById(
                                "pj" + pj.title + pj.id.toString()
                              )
                              .classList.add("btn-success");
                            this.setState({
                              editTitle: pj.title,
                            });
                          } else {
                            document.getElementById(
                              "pj" + pj.id.toString() + pj.title
                            ).style.display = "block";
                            document.getElementById(
                              "pj" + pj.id
                            ).style.display = "none";
                            document
                              .getElementById(
                                "pj" + pj.title + pj.id.toString()
                              )
                              .children[0].classList.remove("fa-check");
                            document
                              .getElementById(
                                "pj" + pj.title + pj.id.toString()
                              )
                              .children[0].classList.add("fa-pencil");
                            document
                              .getElementById(
                                "pj" + pj.title + pj.id.toString()
                              )
                              .classList.remove("btn-success");
                            document
                              .getElementById(
                                "pj" + pj.title + pj.id.toString()
                              )
                              .classList.add("btn-primary");

                            this.props.editProject(
                              this.props.auth.user.id,
                              pj.id,
                              this.state.editTitle,
                              pj.createdAt
                            );
                          }
                        }}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          this.props.deleteProjectOrLabel(
                            this.props.auth.user.id,
                            pj.id,
                            "projects"
                          )
                        }
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <p className="mb-0">
                    created - {moment(pj.createdAt).format("MMM Do YY")}
                  </p>
                  {pj.updatedAt ? (
                    <p className="mt-0">
                      {"updated - " + moment(pj.updatedAt).format("MMM Do YY")}
                    </p>
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
            <ul className="col-md-4 ms-0 ms-md-5 p-3 lb-pj-list p-3">
              <div className="d-flex justify-content-between">
                <h3>Labels</h3>
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
              </div>
              {this.props.labels.labels.map((lb) => (
                <li className="lb-pj-list-item my-2 p-3" key={lb.id}>
                  <div className="d-flex justify-content-between ">
                    <span
                      id={"lb" + lb.id.toString() + lb.text}
                      style={{ display: "block" }}
                    >
                      {lb.text}
                    </span>
                    <input
                      type="text"
                      name="editText"
                      value={this.state.editText}
                      id={"lb" + lb.id}
                      style={{ display: "none" }}
                      onChange={this.handleChange}
                      autoFocus={true}
                    />
                    <div>
                      <button
                        id={"lb" + lb.text + lb.id.toString()}
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => {
                          if (
                            document.getElementById(
                              "lb" + lb.id.toString() + lb.text
                            ).style.display === "block"
                          ) {
                            document.getElementById(
                              "lb" + lb.id
                            ).style.display = "block";

                            document.getElementById(
                              "lb" + lb.id.toString() + lb.text
                            ).style.display = "none";
                            document
                              .getElementById("lb" + lb.text + lb.id.toString())
                              .children[0].classList.remove("fa-pencil");
                            document
                              .getElementById("lb" + lb.text + lb.id.toString())
                              .children[0].classList.add("fa-check");
                            document
                              .getElementById("lb" + lb.text + lb.id.toString())
                              .classList.remove("btn-primary");
                            document
                              .getElementById("lb" + lb.text + lb.id.toString())
                              .classList.add("btn-success");
                            this.setState({
                              editText: lb.text,
                            });
                          } else {
                            document.getElementById(
                              "lb" + lb.id.toString() + lb.text
                            ).style.display = "block";
                            document.getElementById(
                              "lb" + lb.id
                            ).style.display = "none";
                            document
                              .getElementById("lb" + lb.text + lb.id.toString())
                              .children[0].classList.remove("fa-check");
                            document
                              .getElementById("lb" + lb.text + lb.id.toString())
                              .children[0].classList.add("fa-pencil");
                            document
                              .getElementById("lb" + lb.text + lb.id.toString())
                              .classList.remove("btn-success");
                            document
                              .getElementById("lb" + lb.text + lb.id.toString())
                              .classList.add("btn-primary");

                            this.props.editLabel(
                              this.props.auth.user.id,
                              lb.id,
                              this.state.editText,
                              lb.createdAt
                            );
                          }
                        }}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          this.props.deleteProjectOrLabel(
                            this.props.auth.user.id,
                            lb.id,
                            "labels"
                          )
                        }
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>

                  <p className="mb-0">
                    created - {moment(lb.createdAt).format("MMM Do YY")}
                  </p>
                  {lb.updatedAt ? (
                    <p className="mt-0">
                      {"updated - " + moment(lb.updatedAt).format("MMM Do YY")}
                    </p>
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default AllProjectsAndLabels;

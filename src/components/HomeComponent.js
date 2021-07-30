import React, { Fragment } from "react";
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  List,
  Button,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import TaskItemPreview from "./TaskItemPreviewComponent";
import Loading from "./LoadingComponent";
import Message from "./MessageComponent";
import { Redirect } from "react-router-dom";
import moment from "moment";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.changeFilter(+event.target.value);
  }

  render() {
    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    const tasks = this.props.tasks.tasks.filter((task) =>
      moment(task.dueDate).isAfter(moment(moment(), "days"))
    );
    const dueTasks = this.props.tasks.tasks.filter((task) =>
      moment(task.dueDate).isBefore(moment(moment(), "days"))
    );
    const completedTasks = this.props.tasks.tasks.filter(
      (task) => task.isComplete === "true"
    );
    let activeTasks = {};
    switch (this.props.tasks.filter) {
      case 1:
        activeTasks.tasks = tasks.filter((task) =>
          moment(task.dueDate).isSame(moment(moment().add(1, "days")), "day")
        );
        activeTasks.filterType = "Tomorrow";
        break;
      case 2:
        activeTasks.tasks = tasks.filter(
          (task) =>
            moment(task.dueDate).isSameOrAfter(moment(), "day") &&
            moment(task.dueDate).isBefore(moment().endOf("isoWeek"))
        );
        activeTasks.filterType = "This week";
        break;
      case 3:
        activeTasks.tasks = tasks.filter((task) =>
          moment(task.dueDate).isSame(moment(), "month")
        );
        activeTasks.filterType = "To do in " + moment().format("MMMM");
        break;
      case 4:
        activeTasks.tasks = tasks.filter((task) =>
          moment(task.dueDate).isSame(moment(moment().add(1, "month")), "month")
        );
        activeTasks.filterType =
          "To do in " + moment().add(1, "month").format("MMMM");
        break;
      case 5:
        activeTasks.tasks = completedTasks;
        activeTasks.filterType = "Completed Tasks";
        break;

      case 6:
        activeTasks.tasks = dueTasks;
        activeTasks.filterType = "Dued Tasks";
        break;
      default:
        activeTasks.tasks = tasks.filter((task) =>
          moment(task.dueDate).isSame(moment(), "day")
        );
        activeTasks.filterType = "Today";
    }
    return (
      <Fragment>
        {this.props.isLoading && <Loading />}
        {this.props.errMsg && <Message msg={this.props.errMsg} type="error" />}
        {this.props.successMsg && (
          <Message msg={this.props.successMsg} type="success" />
        )}

        {!this.props.isLoading && !this.props.errMsg && (
          <Fragment>
            <div className="mb-2 d-flex justify-content-between">
              <i
                className="fa fa-refresh bg-circle"
                onClick={() => this.props.fetchTasks(this.props.auth.user.id)}
              ></i>
              <Input
                type="select"
                name="filter"
                id="filter"
                className="form-select ms-0 ms-md-auto filter-input"
                value={this.props.tasks.filter}
                onChange={this.handleChange}
              >
                {[
                  { id: 0, title: "Today" },
                  { id: 1, title: "Tomorrow" },
                  { id: 2, title: "This week" },
                  { id: 3, title: `To do in ${moment().format("MMMM")}` },
                  {
                    id: 4,
                    title: `To do in ${moment()
                      .add(1, "month")
                      .format("MMMM")}`,
                  },
                  { id: 5, title: "Completed Tasks" },
                  { id: 6, title: "Due Tasks" },
                ].map((flt, index) => {
                  return (
                    <option value={flt.id} key={index}>
                      {flt.title}
                    </option>
                  );
                })}
              </Input>
            </div>
            <Row>
              <Col lg={{ size: 12 }}>
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      {activeTasks.filterType} - {activeTasks.tasks.length} task
                      {activeTasks.tasks.length > 1 ? "s" : ""}
                    </CardTitle>
                    <hr className="mb-0" />
                    <List type="unstyled" className="my-task-list">
                      {!this.props.comments.isLoading &&
                      !this.props.comments.errMsg &&
                      !this.props.labels.isLoading &&
                      !this.props.labels.errMsg &&
                      !this.props.projects.isLoading &&
                      !this.props.projects.errMsg &&
                      !this.props.isLoading &&
                      !this.props.errMsg &&
                      activeTasks.tasks.length > 0 ? (
                        activeTasks.tasks.map((task) => {
                          return (
                            <TaskItemPreview
                              key={task.id}
                              task={task}
                              taskLabel={task.label}
                              taskProject={task.project}
                              cmtCount={
                                this.props.comments.comments.filter(
                                  (cmt) => cmt.taskId === task.id
                                ).length
                              }
                              changeComplete={this.props.changeComplete}
                              auth={this.props.auth}
                            />
                          );
                        })
                      ) : (
                        <span>No tasks available!</span>
                      )}
                    </List>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm={12} className="text-center mt-3 d-grid d-sm-inline">
                <Link to="/tasks" className="my-link">
                  <Button color="outline-primary" size="md">
                    See All
                  </Button>
                </Link>
              </Col>
            </Row>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Home;

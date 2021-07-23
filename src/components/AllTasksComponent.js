import React from "react";
import { Button } from "reactstrap";
import TaskEditModal from "./TaskEditModalComponent";
import TableGenerater from "./TableGeneraterComponent";
import Loading from "./LoadingComponent";
import Message from "./MessageComponent";
import { Redirect } from "react-router-dom";
class AllTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.checkOk = this.checkOk.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  checkOk() {
    if (
      !this.props.isLoading &&
      !this.props.errMsg &&
      !this.props.projects.isLoading &&
      !this.props.projects.errMsg &&
      !this.props.labels.isLoading &&
      !this.props.labels.errMsg
    ) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="row">
        {this.props.isLoading && <Loading />}
        {this.props.errMsg && <Message msg={this.props.errMsg} type="error" />}
        {this.checkOk() && (
          <div className="col-12">
            <Button className="btn btn-success" onClick={this.toggle}>
              <i className="fa fa-plus"></i>Add Tasks
            </Button>
            <TaskEditModal isOpen={this.state.isOpen} toggle={this.toggle} />
            <hr />
            <h3>All Tasks</h3>
            <TableGenerater tasks={this.props.tasks} />
          </div>
        )}
      </div>
    );
  }
}

export default AllTasks;

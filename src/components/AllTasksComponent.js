import React from "react";
import { Button } from "reactstrap";
import TaskEditModal from "./TaskEditModalComponent";
import TableGenerater from "./TableGeneraterComponent";
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
        <div className="col-12">
          <Button className="btn btn-success" onClick={this.toggle}>
            <i className="fa fa-plus"></i>Add Tasks
          </Button>
          <TaskEditModal isOpen={this.state.isOpen} toggle={this.toggle}/>
          <hr />
          <h3>All Tasks</h3>

          <TableGenerater tasks={this.props.tasks} />
        </div>
      </div>
    );
  }
}

export default AllTasks;

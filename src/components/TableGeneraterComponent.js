import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import React, { Fragment } from "react";
import { Button, Progress } from "reactstrap";
import ToastGenerator from "./ToastGeneratorComponent";
import { Link } from "react-router-dom";
import moment from "moment";
const { SearchBar } = Search;

class TableGenerater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toastOpen: false,
      selected: [],
      toDelete: null,
    };
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
    this.toggleToast = this.toggleToast.bind(this);
    // this.toggle = this.toggle.bind(this);
  }
  handleOnSelect(row, isSelect) {
    if (isSelect) {
      // this.toggleToast(row);
      this.props.changeComplete({ ...row, isComplete: true });
    } else {
      // this.toggleToast();
      this.props.changeComplete({ ...row, isComplete: false });
    }
  }
  handleOnSelectAll(isSelect, rows) {
    if (isSelect) {
      // this.setState({
      //   selected: rows,
      // });
      // this.toggleToast(rows);
      this.props.changeCompleteAll(rows, this.props.auth.user.id, true);
    } else {
      // this.setState({
      //   selected: [],
      // });
      // this.toggleToast();
      this.props.changeCompleteAll(rows, this.props.auth.user.id, false);
    }
  }
  toggleToast(select) {
    // if (select instanceof Array) {
    //   this.setState({
    //     selected: select,
    //   });
    // } else if (select instanceof Object && select._reactName !== "onClick") {
    //   this.setState({
    //     selected: this.state.selected.concat(select),
    //   });
    // } else {
    //   this.setState({
    //     selected: [],
    //   });
    // }
    this.setState({
      toDelete: select,
      toastOpen: !this.state.toastOpen,
    });
  }
  render() {
    const selectRow = {
      mode: "checkbox",
      clickToSelect: false,
      style: { backgroundColor: "#F8F9FA" },
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll,
      selected: [
        ...this.props.tasks
          .filter((row) => row.isComplete === true)
          .map((tsk) => tsk.id),
      ],
    };
    const columns = [
      {
        dataField: "title",
        text: "Title",
        formatter: (rowContent, row) => {
          return (
            <span>
              <Link
                to={{ pathname: `/tasks/${row.id}`, state: { prev: "/tasks" } }}
              >
                {row.title}
              </Link>

              {row.isComplete ? (
                <span
                  style={{
                    color: "white",
                    backgroundColor: "tomato",
                    padding: 4 + "px",
                    borderRadius: 3 + "px",
                    marginLeft: 5 + "px",
                  }}
                >
                  completed
                </span>
              ) : moment(row.dueDate).isBefore(moment()) ? (
                <span
                  style={{
                    color: "white",
                    backgroundColor: "tomato",
                    padding: 4 + "px",
                    borderRadius: 3 + "px",
                    marginLeft: 5 + "px",
                  }}
                >
                  dued
                </span>
              ) : (
                ""
              )}
            </span>
          );
        },
      },
      {
        dataField: "project",
        text: "Project",
        sort: true,
      },
      {
        dataField: "dueDate",
        text: "Due Date",
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: "100px", textAlign: "center" };
        },
        formatter: (rowContent, row) => {
          return <span>{moment(row.dueDate).format("MMM Do YY")}</span>;
        },
      },
      {
        dataField: "priority",
        text: "Priority",
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: "80px", textAlign: "center" };
        },
      },
      {
        dataField: "label",
        text: "Label",
        headerStyle: (colum, colIndex) => {
          return { width: "80px", textAlign: "center" };
        },
      },
      {
        dataField: "progress",
        text: "Progress",
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: "100px", textAlign: "center" };
        },
        formatter: (rowContent, row) => {
          return (
            <div>
              <div className="text-center">{row.progress}%</div>
              <Progress
                value={row.progress}
                color="primary"
                className="my-progress-bar-table"
              />
            </div>
          );
        },
      },
      {
        dataField: "",
        text: "Action",
        align: "left",
        headerStyle: (colum, colIndex) => {
          return { width: "80px", textAlign: "center" };
        },
        formatter: (rowContent, row) => {
          return (
            <div>
              <Button
                color="info"
                size="sm"
                onClick={() => this.props.stageEditTask(row)}
              >
                <i className="fa fa-pencil"></i>
              </Button>
              <Button
                className="ms-0 ms-md-1"
                color="danger"
                size="sm"
                onClick={() => this.toggleToast(row)}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </div>
          );
        },
      },
    ];

    return (
      <Fragment>
        <ToastGenerator
          toastOpen={this.state.toastOpen}
          toggleToast={this.toggleToast}
          selected={this.state.toDelete}
          deleteTask={this.props.deleteTask}
          auth={this.props.auth}
        />
        <ToolkitProvider
          keyField="id"
          data={this.props.tasks}
          columns={columns}
          search
          className="table-responsive"
        >
          {(props) => (
            <div>
              <SearchBar {...props.searchProps} className="mb-3" />
              <BootstrapTable
                {...props.baseProps}
                selectRow={selectRow}
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      </Fragment>
    );
  }
}

export default TableGenerater;

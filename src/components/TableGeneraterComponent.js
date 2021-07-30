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
    };
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
    this.toggleToast = this.toggleToast.bind(this);
    // this.toggle = this.toggle.bind(this);
  }
  handleOnSelect(row, isSelect) {
    if (isSelect) {
      this.toggleToast(row);
    } else {
      this.toggleToast();
    }
  }
  handleOnSelectAll(isSelect, rows) {
    if (isSelect) {
      this.setState({
        selected: rows,
      });
      this.toggleToast(rows);
    } else {
      this.setState({
        selected: [],
      });
      this.toggleToast();
    }
  }
  toggleToast(select) {
    if (select instanceof Array) {
      this.setState({
        selected: select,
      });
    } else if (select instanceof Object && select._reactName !== "onClick") {
      this.setState({
        selected: this.state.selected.concat(select),
      });
    } else {
      this.setState({
        selected: [],
      });
    }
    this.setState({
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
      selected: [...this.state.selected.map((row) => row.id)],
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
              {moment(row.dueDate).isBefore(moment()) ? (
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
        text: "Edit",
        align: "left",
        headerStyle: (colum, colIndex) => {
          return { width: "50px", textAlign: "center" };
        },
        formatter: (rowContent, row) => {
          return (
            <Button
              color="info"
              size="sm"
              onClick={() => this.props.stageEditTask(row)}
            >
              <i className="fa fa-pencil"></i>
            </Button>
          );
        },
      },
    ];

    return (
      <Fragment>
        <ToastGenerator
          toastOpen={this.state.toastOpen}
          toggleToast={this.toggleToast}
          selected={
            this.state.selected.length > 1
              ? { title: "All Tasks" }
              : this.state.selected[0]
          }
          deleteTask={this.props.deleteTask}
          deleteAllTasks={this.props.deleteAllTasks}
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

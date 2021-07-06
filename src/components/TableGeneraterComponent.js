import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import React, { Fragment } from "react";
import { Button, Progress } from "reactstrap";
import ToastGenerator from "./ToastGeneratorComponent";
import { Link } from "react-router-dom";
const { SearchBar } = Search;
const columns = [
  {
    dataField: "title",
    text: "Title",
    formatter: (rowContent, row) => {
      return (
        <Link to={{ pathname: `/tasks/${row.id}`, state: { prev: "/tasks" } }}>
          {row.title}
        </Link>
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
        <Button color="info" size="sm">
          <i className="fa fa-pencil"></i>
        </Button>
      );
    },
  },
];

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
    } else if (select._reactName !== "onClick") {
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

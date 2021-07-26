import React, { useState } from "react";
import { Col, Row, Progress, Input } from "reactstrap";
import { Link } from "react-router-dom";

import BadgeToolTip from "./BadgeTooltipComponent";
import ToastGenerator from "./ToastGeneratorComponent";
import moment from "moment";

function TaskItemPreview({ task, taskLabel, taskProject, cmtCount }) {
  const [priority, setPriority] = useState(false);
  const [label, setLabel] = useState(false);
  const [project, setProject] = useState(false);
  const [selected, setSelected] = useState({});
  const [toastOpen, setToastOpen] = useState(false);

  const toggleToast = (selected) => {
    if (selected) {
      setSelected(selected);
    }
    setToastOpen(!toastOpen);
  };

  const togglePriority = () => {
    setPriority(!priority);
  };
  const toggleLabel = () => {
    setLabel(!label);
  };
  const toggleProject = () => {
    setProject(!project);
  };
  return (
    <div className="mt-2 my-bg-light">
      <ToastGenerator
        toastOpen={toastOpen}
        toggleToast={toggleToast}
        selected={selected}
      />
      <Progress
        value={task.progress}
        color="primary"
        className="my-progress-bar"
      />
      <div className="p-3">
        <Row>
          <Col xs="10">
            <Link
              to={{ pathname: `/tasks/${task.id}`, state: { prev: "/home" } }}
              className="my-link"
            >
              <h5>{task.title}</h5>
            </Link>
          </Col>
          <Col>
            <Input
              type="checkbox"
              name="completeTask"
              id="completeTask"
              checked={toastOpen}
              onChange={() => toggleToast(task)}
            />
          </Col>
        </Row>

        <BadgeToolTip
          tooltip={priority}
          target="priority"
          badge={task.priority}
          badgeType="Priority"
          toggleTooltip={togglePriority}
        ></BadgeToolTip>
        {task.label && (
          <BadgeToolTip
            tooltip={label}
            target="label"
            badge={taskLabel}
            badgeType="Label"
            toggleTooltip={toggleLabel}
          ></BadgeToolTip>
        )}
        {task.project && (
          <BadgeToolTip
            tooltip={project}
            target="project"
            badge={taskProject}
            badgeType="Project"
            toggleTooltip={toggleProject}
          ></BadgeToolTip>
        )}
        <div className="mt-3 mb-2">
          <span>
            <i className="fa fa-calendar"></i>{" "}
            {moment(task.dueDate).format("MMM Do YY")}{" "}
          </span>
          <span>
            <i className="fa fa-comment"></i> {cmtCount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TaskItemPreview;

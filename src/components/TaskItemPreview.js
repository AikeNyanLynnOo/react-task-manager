import React, { useState } from "react";
import { Col, Row, Progress, Input } from "reactstrap";
import { Link } from "react-router-dom";

import BadgeToolTip from "./BadgeTooltip";
function TaskItemPreview({ task }) {
  const [priority, setPriority] = useState(false);
  const [label, setLabel] = useState(false);
  const [project, setProject] = useState(false);

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
    <Link to={`/tasks/${task.id}`} className="my-link">
      <div className="mt-4 my-bg-light">
        <Progress
          value={task.progress}
          color="primary"
          className="my-progress-bar"
        />
        <div className="p-3">
          <Row>
            <Col xs="10">
              <h5>{task.title}</h5>
            </Col>
            <Col>
              <Input type="checkbox" />
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
              badge={task.label}
              badgeType="Label"
              toggleTooltip={toggleLabel}
            ></BadgeToolTip>
          )}
          {task.project && (
            <BadgeToolTip
              tooltip={project}
              target="project"
              badge={task.project}
              badgeType="Project"
              toggleTooltip={toggleProject}
            ></BadgeToolTip>
          )}
          <span>
            <i className="fa fa-calendar"></i> {task.dueDate}{" "}
          </span>
          <span>
            <i className="fa fa-comment"></i> {task.comments.length}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default TaskItemPreview;

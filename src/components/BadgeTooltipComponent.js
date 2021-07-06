import { Fragment } from "react";
import { Tooltip } from "reactstrap";

function BadgeToolTip(props) {
  return (
    <Fragment>
      <span className="badge bg-primary me-1" id={props.target}>
        {props.badge}
      </span>
      <Tooltip
        placement="top"
        isOpen={props.tooltip}
        target={props.target}
        toggle={props.toggleTooltip}
      >
        {props.badgeType}
      </Tooltip>
    </Fragment>
  );
}

export default BadgeToolTip;

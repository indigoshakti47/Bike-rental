import React, { useEffect, useState, useCallback } from 'react';

import classNames from 'classnames';
import { Tooltip } from 'reactstrap';

import { statuses } from '../../data/bikeStatus';

export default function StatusItem({ status, reservationId }) {
  const [statusObject, setStatusObject] = useState({});
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const currentStatus = statuses.find((statusItem) => statusItem.value === status);
    setStatusObject(currentStatus);
  }, [status, setStatusObject]);

  const toggleTooltip = useCallback(() => {
    setTooltipOpen(state => !state);
  }, [setTooltipOpen]);

  return (
    <>
      <Tooltip placement="top" isOpen={tooltipOpen} toggle={toggleTooltip} target={`statusTooltip${reservationId}`}>
        {statusObject.text}
      </Tooltip>
      <div
        id={`statusTooltip${reservationId}`}
        className={classNames("p-2 rounded-circle text-white d-flex justify-content-center align-items-center square-40", `bg-${statusObject.color}`)}
      >
        <i className={classNames("fa-lg", statusObject.icon)} />
      </div>
    </>
  );
};

import React from 'react'

import { useSelector } from 'react-redux';

import classNames from 'classnames';

import { ToastBody } from "reactstrap";

const iconsMap = {
  success: 'ni ni-check-bold',
  info: 'ni ni-air-baloon',
  error: 'ni ni-fat-remove',
};

const titlesMap = {
  success: 'Awesome!',
  info: 'Info!',
  error: 'Whoops :(',
};

export default function DeliveryToast() {
  const alert = useSelector((state) => state.alerts.alert);

  const message = alert?.message;
  const type = alert?.type;

  return (
      <div className={classNames('toast fade', {
        'bg-success': type === 'success',
        'bg-info': type === 'info',
        'bg-danger': type === 'error',
        'show': !!alert,
      })}
      >
        <div className="toast-header text-white border-bottom d-flex align-items-center">
          <i className={iconsMap[type]} />
          <strong className="ml-2">{titlesMap[type]}</strong>
        </div>
        <ToastBody className="text-white">
          {message}
        </ToastBody>
      </div>
  )
}

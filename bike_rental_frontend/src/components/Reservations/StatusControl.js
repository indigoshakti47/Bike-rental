import React from 'react';

import classNames from 'classnames';

export default function StatusControl({ color, text, onClick, active }) {
  return (
    <div
      onClick={onClick}
      style={{cursor: 'pointer' }}
      className={classNames('p-2 shadow-sm rounded cursor-pointer text-center', {
        [`bg-${color}`]: active,
        'text-white': active,
        [`text-${color}`]: !active,
        'bg-white': !active,
        'border': !active,
      })}
    >
      {text}
    </div>
  )
};

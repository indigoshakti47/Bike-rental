import React from 'react';
import { useSelector } from 'react-redux';
import formatRelative from "date-fns/formatRelative";
import { Card as Ca, Button } from "reactstrap";
export default function Card({ user, onDelete, onEdit }) {
  const role = useSelector(state => state.auth.role);
  return (
    <Ca className="p-4 w-100 d-flex d-flex-column justify-content-between h-100">
      <div className="d-flex align-items-center">
        {user.roles && user?.roles[0] &&
        <h2 className="pl-3 pt-2">Role: {user?.roles ? user?.roles['0']['name'] : null}</h2>
      }

      </div>
      <span className="d-flex pl-3 align-items-center">
          Name: {user.name} 
      </span>
      <span className="d-flex pl-3 align-items-center">
          Email: {user.email} 
      </span>
      <small className="pl-3 pb-2 text-capitalize">
        {formatRelative(new Date(user.createdAt), new Date())}
      </small>
      <div className="d-flex justify-content-end">
        {
          role === 'manager' && (
            <>
              <Button color="primary" onClick={() => onEdit(user)}>Edit</Button>
              <Button color="danger" onClick={() => onDelete(user._id)}>Delete</Button>
            </>
          )
        }
      </div>
    </Ca>
  )
}


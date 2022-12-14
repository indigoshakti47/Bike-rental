import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Card as Ca, Button } from "reactstrap";
import Rating from "./Rating";

export default function Card({ bike, onDelete, onEdit, onReserve }) {
  const role = useSelector(state => state.auth.role);
  return (
    <Ca className="p-4 w-100 d-flex d-flex-column justify-content-between h-100">
      <div className="d-flex align-items-center">
        <i className="ni ni-shop fa-2x"></i>
        <h2 className="pl-3 pt-2">{bike.model}</h2>
      </div>
      <p className="pt-2">{bike.location}</p>
      <Rating rating={bike.rating}/>
      <div className="d-flex justify-content-ceter">
        <Link className="btn btn-success" to={`bike/${bike._id}`}>Bike</Link>
        {
          role === 'manager' ?
            <>
              <Button color="primary" onClick={() => onEdit(bike)}>Edit</Button>
              <Button color="danger" onClick={() => onDelete(bike._id)}>Delete</Button>
            </>
            :
            <>
              <Button color="primary" onClick={() => onReserve(bike._id)}>Reserve</Button>
            </>
        }
      </div>
    </Ca>
  )
}

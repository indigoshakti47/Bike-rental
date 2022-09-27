import React, { useEffect, useState } from "react";

import formatRelative from "date-fns/formatRelative";

import classNames from "classnames";
import { useSelector } from "react-redux";
import StatusItem from "./StatusItem";

import { Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import {
  clientStatesChanges,
  restaurantStatesChanges,
} from "../../data/reservationStatus";

function groupBikes(bikes) {
  const res = {};

  for (const bike of bikes) {
    if (res[bike._id]) {
      res[bike._id].quantity++;
    } else {
      res[bike._id] = {
        ...bike,
        quantity: 1,
      };
    }
  }

  return Object.values(res);
}

export default function ReservationCard({ reservation, onStatusChange, onBlockUser }) {
  const role = useSelector((state) => state.auth.role);
  const [bikes, setBikes] = useState([]);

  const statusChanges =
    role === "manager" ? clientStatesChanges : clientStatesChanges;

  const nextStatus = statusChanges[reservation.status];

  useEffect(() => {
    const groupedBikes = groupBikes(reservation.bikes);
    setBikes(groupedBikes);
  }, [reservation.bikes]);

  const handleClick = () => {
    onStatusChange(reservation._id, nextStatus.status);
  };

  return (
    <Card className="h-100">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="d-flex align-items-center">
            <i className="ni ni-shop mr-2" />
            {reservation.restaurant.name}
          </h2>
          { role === 'manager' &&
            <span className="d-flex align-items-center">
              <i className="ni ni-circle-08 mr-2" />
              {reservation.user.name}
              <Button className="ml-3 py-0 px-2" color="danger" onClick={() => onBlockUser(reservation.user._id)}>Block user</Button>
            </span>
          }
          <small className="text-capitalize">
            {formatRelative(new Date(reservation.createdAt), new Date())}
          </small>
        </div>
        <StatusItem status={reservation.status} orderId={reservation._id} />
      </CardHeader>
      <CardBody>
        <h3>Meals</h3>
        {bikes.map((bike, index) => (
          <div
            className={classNames(
              "d-flex justify-content-between align-items-center py-2",
              { "border-bottom": index < bikes.length - 1 }
            )}
            key={bike.name}
          >
            <div className="d-flex flex-column">
              <strong>
                <i className="fas fa-hamburger mr-2"></i>
                {bike.name}
              </strong>
              <span>$ {bike.price}</span>
            </div>
            <span className="pr-2">x {bike.quantity}</span>
          </div>
        ))}
      </CardBody>
      <CardFooter className="d-flex justify-content-between align-items-center">
        <h3 className="mb-0">Total: ${reservation.totalAmount}</h3>
        {nextStatus && (
          <Button color={nextStatus.color} onClick={handleClick}>
            {nextStatus.text}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

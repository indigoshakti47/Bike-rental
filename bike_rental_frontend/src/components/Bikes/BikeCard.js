import React from "react";
import formatRelative from "date-fns/formatRelative";
import StatusItem from "./StatusItem";
import { Card, CardHeader } from "reactstrap";
import Rating from "./Rating";

export default function bikeCard({ bike, changeRating }) {
  return (
    <Card className="h-100">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="d-flex align-items-center">
            Model: {bike.model}
          </h2>
          <span className="d-flex align-items-center">
            Color: {bike.color}
          </span>
          <span className="d-flex align-items-center">
            Location: {bike.location}
          </span>
          <small className="text-capitalize">
            {formatRelative(new Date(bike.createdAt), new Date())}
          </small>
        </div>
        <div className="align-items-end flex-column d-flex ">
          <Rating changeRating={changeRating} rating={bike.rating} />
          <StatusItem status={bike.status} orderId={bike._id} />
        </div>

      </CardHeader>
    </Card>
  );
}
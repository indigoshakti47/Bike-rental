import React from "react";
import formatRelative from "date-fns/formatRelative";
import StatusItem from "./StatusItem";
import { Card, CardHeader } from "reactstrap";

export default function bikeCard({ bike }) {
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
        <StatusItem status={bike.status} orderId={bike._id} />
      </CardHeader>
    </Card>
  );
}
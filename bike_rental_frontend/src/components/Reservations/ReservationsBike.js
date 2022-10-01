import React from "react";
import formatRelative from "date-fns/formatRelative";
import classNames from "classnames";

export default function ReservationsBike({ reservation, border }) {
    const bike = reservation.bike
    return (
        <div
            className={classNames(
                "d-flex justify-content-between align-items-center py-2",
                { "border-bottom": border }
            )}
        >
            <div>
                <h4 className="d-flex align-items-center">
                    Bike
                </h4>
                <span className="d-flex align-items-center">
                    Model: {bike.model}
                </span>
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
            <div>
                <h4 className="d-flex align-items-center">
                    Reservation
                </h4>
                <strong>
                    <i className="fas fa-hamburger mr-2"></i>
                    createdAt:
                    <small className="text-capitalize">
                        {formatRelative(new Date(reservation.createdAt), new Date())}
                    </small>
                </strong>
                <span className="d-flex align-items-center">
                    Start Date: {formatRelative(new Date(reservation.startDate), new Date())}
                </span>
                <span className="d-flex align-items-center">
                    End Date: {formatRelative(new Date(reservation.createdAt), new Date())}
                </span>
                <span>$ {reservation.totalAmount}</span>
            </div>

            {reservation.status === 'confirm' ?
                <span className="pr-2">reserved</span>
                :
                <span className="pr-2">Canceled</span>
            }
        </div>
    );
}
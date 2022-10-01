import React from "react";
import formatRelative from "date-fns/formatRelative";
import classNames from "classnames";

export default function ReservationsUser({ reservation, border }) {
    const user = reservation.user
    return (
        <div
            className={classNames(
                "d-flex justify-content-between align-items-center py-2",
                { "border-bottom": border }
            )}
        >
            <div>
                <h4 className="d-flex align-items-center">
                    User
                </h4>
                <span className="d-flex pl-3 align-items-center">
                    Name: {user.name}
                </span>
                <span className="d-flex pl-3 align-items-center">
                    Email: {user.email}
                </span>
                <small className="pl-3 pb-2 text-capitalize">
                    {formatRelative(new Date(user.createdAt), new Date())}
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
import React from 'react';
import formatRelative from "date-fns/formatRelative";
import { Card, Button, Col } from "reactstrap";
export default function UserCard({ user, showBooking }) {
    return (
        <>
            {user.reservations &&
                <Col className="pb-2">

                    <Card className="p-4 w-100 d-flex d-flex-column justify-content-between h-100">
                        <div className="d-flex align-items-center">
                            <h2 className="pl-3 pt-2">Bookings: {user.reservations.length}</h2>
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
                            <>
                                <Button color="primary" onClick={() => showBooking(user.reservations)}>View Bookings</Button>
                            </>
                        </div>
                    </Card>
                </Col>
            }

        </>

    )
}


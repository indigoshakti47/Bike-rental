import React from 'react';
import formatRelative from "date-fns/formatRelative";
import { Card, Button, Col } from "reactstrap";
export default function BikeCard({ bike, showBooking }) {
    return (
        <>
            {bike.reservations &&
                <Col className="pb-2">

                    <Card className="p-4 w-100 d-flex d-flex-column justify-content-between h-100">
                        <div className="d-flex align-items-center">
                            <h2 className="pl-3 pt-2">Bookings: {bike.reservations.length}</h2>
                        </div>

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
                        <div className="d-flex justify-content-end">
                            <>
                                <Button color="primary" onClick={() => showBooking(bike.reservations)}>View Bookings</Button>
                            </>
                        </div>
                    </Card>
                </Col>
            }

        </>

    )
}


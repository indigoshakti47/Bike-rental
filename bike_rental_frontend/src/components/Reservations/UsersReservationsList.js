import React from 'react'

import { CardFooter, CardBody } from "reactstrap";
import ReservationsBike from './ReservationsBike';

export default function List({ reservations = [] }) {
    return (
            
        <CardBody>
            <h3>Reservations</h3>
            {reservations.map((reservation, index) => (
          
                <ReservationsBike reservation={reservation} key={index} border={index < reservations.length - 1} />
            ))}
            <CardFooter className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Total: ${reservations.reduce((total, item) => total + item.totalAmount, 0)}</h3>
            </CardFooter>
        </CardBody>

    )
}
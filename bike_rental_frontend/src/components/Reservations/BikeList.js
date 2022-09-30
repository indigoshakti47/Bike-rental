import React from 'react'

import { Container, Row } from "reactstrap";
import BikeCard from './BikeCard';

export default function BikeList({ bikes = [], showBooking }) {

    return (
        <Container fluid className="pt-2">
            <Row sm="1" md="2">
                {
                    bikes.map((bike, index) => (
                        <BikeCard key={index} bike={bike} showBooking={showBooking} />
                    ))
                }
            </Row>
        </Container>
    )
}

import React from 'react'

import { Container, Row } from "reactstrap";
import UserCard from './UserCard';

export default function UserList({ users = [], showBooking }) {

    return (
        <Container fluid className="pt-2">
            <Row sm="1" md="2">
                {
                    users.map((user, index) => (
                        <UserCard key={index} user={user} showBooking={showBooking}/>
                    ))
                }
            </Row>
        </Container>
    )
}

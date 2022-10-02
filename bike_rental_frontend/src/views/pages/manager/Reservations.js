import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    reservationsByUsers
} from '../../../actions/users';
import { Row, CardLink } from "reactstrap";
import EmptyState from "../../../components/SharedComponents/EmptyState";
import CardContainer from "../../../components/SharedComponents/CardContainer";
import UserList from "../../../components/Reservations/UserList";
import UsersReservationsList from '../../../components/Reservations/UsersReservationsList';

const Reservations = () => {
    const [show, setShow] = useState(false)
    const [reservations, setReservations] = useState([])
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);
    const load = () => {
        dispatch(reservationsByUsers());
    }
    useEffect(load, [dispatch]);
    const showBooking = (reservations) => {
        setshow()
        setReservations(reservations)
    }

    const setshow = () => {
        setShow(!show)
    }

    return (
        <CardContainer title={'Users Reservations'} >
            {show ?
                <>
                    <CardLink onClick={setshow}><i class="fa-solid fa-arrow-left"></i> Back</CardLink>
                    <UsersReservationsList reservations={reservations} onlyShow={true} />
                </>

                :
                <Row>
                    {!!users?.length ?
                        <UserList users={users} showBooking={showBooking} /> :
                        <EmptyState item="user" />
                    }
                </Row>
            }

        </CardContainer>
    );
};

export default Reservations;

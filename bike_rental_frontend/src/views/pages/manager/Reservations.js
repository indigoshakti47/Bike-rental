import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import {
    reservationsByUsers
} from '../../../actions/users';
import { useAlert } from "../../../hooks/useAlert";
import { Row } from "reactstrap";

import EmptyState from "../../../components/SharedComponents/EmptyState";
import CardContainer from "../../../components/SharedComponents/CardContainer";
import UserList from "../../../components/Reservations/UserList";
import UsersReservationsList from '../../../components/Reservations/UsersReservationsList';

const Reservations = () => {
    const [ show, setShow ] = useState(false)
    const [ reservations, setReservations ] = useState([])
    const [ user, setUser ] = useState({})
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);
    const load = () => {
        dispatch(reservationsByUsers());
    }
    useEffect(load, [dispatch]);
    const showBooking = (user , reservations) => {
        setShow(true)
        setUser(user)
        console.log(reservations)
        setReservations(reservations)
    }
    return (
        <CardContainer title={'Users Reservations'} >
            {show ?
                <UsersReservationsList reservations={reservations} onlyShow={true}/>
                :
                <Row>
                    {!!users?.length ?
                        <UserList users={users} showBooking={showBooking} /> :
                        <EmptyState item="user" onActionClick={load} />
                    }
                </Row>
            }

        </CardContainer>
    );
};

export default Reservations;

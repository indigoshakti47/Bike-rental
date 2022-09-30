import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    reservedBikes
} from '../../../actions/bikes';
import { Row, CardLink } from "reactstrap";
import EmptyState from "../../../components/SharedComponents/EmptyState";
import CardContainer from "../../../components/SharedComponents/CardContainer";
import BikeList from "../../../components/Reservations/BikeList";
import BikesReservationsList from '../../../components/Reservations/BikesReservationsList';

const ReservedBikes = () => {
    const [show, setShow] = useState(false)
    const [reservations, setReservations] = useState([])
    const dispatch = useDispatch();
    const { bikes } = useSelector((state) => state.bikes);

    const load = () => {
        dispatch(reservedBikes());
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
        <CardContainer title={'Reserved bikes'} >
            {show ?
                <>
                    <CardLink onClick={setshow}><i class="fa-solid fa-arrow-left"></i> Back</CardLink>
                    <BikesReservationsList reservations={reservations} onlyShow={true} />
                </>

                :
                <Row>
                    {!!bikes?.length ?
                        <BikeList bikes={bikes} showBooking={showBooking} /> :
                        <EmptyState item="bike" onActionClick={load} />
                    }
                </Row>
            }

        </CardContainer>
    );
};

export default ReservedBikes;

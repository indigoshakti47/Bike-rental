import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listBikes } from '../../../actions/bikes';
import { create } from '../../../actions/reservations';
import { useAlert } from "../../../hooks/useAlert";
import { Container, Row } from "reactstrap";
import Header from "../../../components/Header.js";
import EmptyState from "../../../components/SharedComponents/EmptyState";
import BikeList from "../../../components/Bikes/List";
import BikeFormReserveModal from "../../../components/Bikes/BikeFormReserveModal";
import Filter from "../../../components/Bikes/Filter";
const Bikes = () => {
    const [bike, setBike] = useState({});
    const [open, setOpen] = useState(false);
    const { bikes } = useSelector((state) => state.bikes);
    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(() => {
        dispatch(listBikes({ status: 'true' }));
    }, [dispatch]);

    const handleReserve = async (formData) => {
        if (bike) {
            await dispatch(create(bike, formData));
            alert('The Reservation was created successfully!');
        }
        setOpen(false);
    };
    const handleModal = (bike) => {
        setBike(bike)
        setOpen(!open);
    };
    const hendleFilter = (data) => {
        dispatch(listBikes({...data, ...{ status: 'true' } } ));
    };
    return (
        <>
            <Header>
                <Filter search={hendleFilter} />
            </Header>
            <Container className="mt--7" fluid>
                <Row>
                    {
                        !!bikes?.length ?
                            <BikeList bikes={bikes} onReserve={handleModal} /> :
                            <EmptyState item="bike" />
                    }
                </Row>
            </Container>
            <BikeFormReserveModal
                isOpen={open}
                onClose={handleModal}
                onConfirm={handleReserve}
            />
        </>
    );
};

export default Bikes;

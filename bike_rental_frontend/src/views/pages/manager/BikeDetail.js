import React, { useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBikeById, addRating } from '../../../actions/bikes';
import { listReservations } from '../../../actions/reservations';

import { useAlert } from '../../../hooks/useAlert';
import BikeCard from "../../../components/Bikes/BikeCard";
import CardContainer from "../../../components/SharedComponents/CardContainer";
import ReservationsList from '../../../components/Reservations/List'
export default function BikeDetail() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { bikeId } = useParams();
  const { bike } = useSelector((state) => state.bikes)
  const { reservations } = useSelector((state) => state.reservations)
  const fetchData = useCallback(async () => {
    try {
      await dispatch(listReservations(bikeId));
      await dispatch(getBikeById(bikeId));
    } catch (error) {
      alert('Something went wrong', 'error')
    }
  }, [dispatch, bikeId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const changeRating = async(e) => {
    await dispatch(addRating(bike._id, {rating: e}))
  }
  return (
    <CardContainer title='Manage your Bike'>
      {bike &&
        <BikeCard bike={bike} changeRating={changeRating} />
      }
      {reservations &&
        <ReservationsList reservations={reservations} />
      }

    </CardContainer>
  )
}

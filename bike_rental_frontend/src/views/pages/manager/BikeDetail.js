import React, { useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBikeById } from '../../../actions/bikes';
import { useAlert } from '../../../hooks/useAlert';
import BikeCard from "../../../components/Bikes/BikeCard";
import CardContainer from "../../../components/SharedComponents/CardContainer";

export default function BikeDetail() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { bikeId } = useParams();
  const { bike } = useSelector((state) => state.bikes)
  const fetchData = useCallback(async () => {
    try {
      console.log('Something went wrong', 'error')
      await dispatch(getBikeById(bikeId));
    } catch (error) {
      alert('Something went wrong', 'error')
    }
  }, [dispatch, bikeId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <CardContainer title='Manage your Bike'>
      {bike &&
        <BikeCard bike={bike} />
      }
    </CardContainer>
  )
}

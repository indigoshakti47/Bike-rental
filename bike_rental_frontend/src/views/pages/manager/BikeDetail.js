import React, { useEffect, useState, useCallback } from 'react'

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getBikeById } from '../../../actions/bikes';

// import { listMealsByBike, createMeal, updateMeal, deleteMeal } from 'actions/meal';
// import OrdersService from '../../services/OrdersService';
import { useAlert } from '../../../hooks/useAlert';


import { Container, Row, Button } from "reactstrap";
import Header from "../../../components/Header.js";
import EmptyState from "../../../components/SharedComponents/EmptyState";
import ConfirmationDialog from "../../../components/SharedComponents/ConfirmationDialog";
import BikeList from "../../../components/Bikes/List";
import BikeFormModal from "../../../components/Bikes/FormModal";


export default function BikeDetail() {
  const [editingMeal, setEditingMeal] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { bikeId } = useParams();
  const { bike } = useSelector((state) => state.bikes);

  const fetchData = useCallback(async () => {
    try {
      await dispatch(getBikeById(bikeId));
    } catch (error) {
      alert('Something went wrong', 'error')
    }
  }, [dispatch, bikeId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

console.log(bike)
  return (
    <>
    </>
  )
}

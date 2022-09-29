import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';

import {
  listBikes,
  createBike,
  deleteBike,
  updateBike
} from '../../../actions/bikes';
import { useAlert } from "../../../hooks/useAlert";
import { Container, Row, Button } from "reactstrap";
import Header from "../../../components/Header.js";

import EmptyState from "../../../components/SharedComponents/EmptyState";
import ConfirmationDialog from "../../../components/SharedComponents/ConfirmationDialog";
import BikeList from "../../../components/Bikes/List";
import BikeFormModal from "../../../components/Bikes/FormModal";

const Bikes = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [editingBike, setEditingBike] = useState(false);
  const { bikes } = useSelector((state) => state.bikes);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    dispatch(listBikes());
  }, [dispatch]);

  const handleFormModalClose = () => {
    setIsNewModalOpen(false);
    setEditingBike(false);
  };

  const handleFormModalOpen = () => {
    setIsNewModalOpen(true);
  }

  const submitBike = async (bikeData) => {
    if (editingBike) {
      await dispatch(updateBike(editingBike._id, bikeData));
      alert('The Bike was edited successfully! ');
    } else {
      await dispatch(createBike(bikeData));
      alert('The Bike was created successfully! ');
    }
    setIsNewModalOpen(false);
    setEditingBike(false);
  };

  const confirmDelete = async () => {
    await dispatch(deleteBike(deleteId));
    setDeleteId(false);
    alert('The Bike was deleted successfully! ');
  }

  const handleDelete = (restauratId) => {
    setDeleteId(restauratId);
  };

  const handleEdit = (bike) => {
    setEditingBike(bike);
  };

  return (
    <>
      {
        <Header>
          <Button onClick={handleFormModalOpen}>Add New Bike</Button>
        </Header>
      }
      <Container className="mt--7" fluid>
        <Row>
          {
            !!bikes?.length ?
              <BikeList bikes={bikes} onEdit={handleEdit} onDelete={handleDelete} /> :
              <EmptyState item="bike" onActionClick={handleFormModalOpen} />
          }
        </Row>
      </Container>
      <BikeFormModal
        isOpen={isNewModalOpen || !!editingBike}
        onClose={handleFormModalClose}
        editValues={editingBike}
        onConfirm={submitBike}
      />
      <ConfirmationDialog
        text="Are you sure you want to delete this Bike? All it's meals will be deleted too."
        isOpen={!!deleteId}
        onCancel={() => setDeleteId(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Bikes;

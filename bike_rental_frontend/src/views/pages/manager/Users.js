import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';

import {
  listUsers,
  createUser,
  deleteUser,
  updateUser
} from '../../../actions/users';
import { useAlert } from "../../../hooks/useAlert";
import { Container, Row, Button } from "reactstrap";
import Header from "../../../components/Header.js";

import EmptyState from "../../../components/SharedComponents/EmptyState";
import ConfirmationDialog from "../../../components/SharedComponents/ConfirmationDialog";
import UserList from "../../../components/Users/List";
import UserFormModal from "../../../components/Users/FormModal";

const Users = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const handleFormModalClose = () => {
    setIsNewModalOpen(false);
    setEditingUser(false);
  };

  const handleFormModalOpen = () => {
    setIsNewModalOpen(true);
  }

  const submitUser = async (UserData) => {
    if (editingUser) {
      await dispatch(updateUser(editingUser._id, UserData));
      alert('The User was edited successfully! ');
    } else {
      await dispatch(createUser(UserData));
      alert('The User was created successfully! ');
    }
    setIsNewModalOpen(false);
    setEditingUser(false);
  };

  const confirmDelete = async () => {
    await dispatch(deleteUser(deleteId));
    setDeleteId(false);
    alert('The User was deleted successfully! ');
  }

  const handleDelete = (restauratId) => {
    setDeleteId(restauratId);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  return (
    <>
      {
        <Header>
          <Button onClick={handleFormModalOpen}>Add New User</Button>
        </Header>
      }
      <Container className="mt--7" fluid>
        <Row>
          {
            !!users?.length ?
              <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} /> :
              <EmptyState item="user" onActionClick={handleFormModalOpen} />
          }
        </Row>
      </Container>
      <UserFormModal
        isOpen={isNewModalOpen || !!editingUser}
        onClose={handleFormModalClose}
        editValues={editingUser}
        onConfirm={submitUser}
      />
      <ConfirmationDialog
        text="Are you sure you want to delete this User? All it's meals will be deleted too."
        isOpen={!!deleteId}
        onCancel={() => setDeleteId(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Users;

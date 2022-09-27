import React, { useState, useEffect, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { Row, Col, Card } from "reactstrap";

import StatusControl from './StatusControl';
import ReservationCard from './ReservationCard';
import ConfirmationDialog from "../../components/SharedComponents/ConfirmationDialog";

import ReservationsService from '../../services/ReservationsService';
import UserService from '../../services/UserService';

import { statuses } from '../../data/reservationStatus';
import { useAlert } from '../../hooks/useAlert';

export default function ReservationsTable() {
  const [filters, setFilters] = useState({ status: 'placed' });
  const [reservations, setReservations] = useState([]);
  const [blockingUser, setBlockingUser] = useState(false);
  const role = useSelector(state => state.auth.role);
  const alert = useAlert();

  const fetchReservations = useCallback(async () => {
    const params = role === 'manager' ? { status: filters.status } : {};
    const fetchedReservations = await ReservationsService.getReservations(params);
    setReservations(fetchedReservations);
  }, [filters.status, role]);

  useEffect(() => {  
    fetchReservations();
  }, [filters.status, fetchReservations]);
  

  const handleChangeStatus = (newStatus) => () => {
    setFilters({
      ...filters,
      status: newStatus,
    });
  };

  const handleBlockUser = async () => {
    try {
      await UserService.blockUser(blockingUser);
      alert('User blocked succesfully!', 'success');
      fetchReservations();
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong', 'error');
    } finally {
      setBlockingUser(false);
    }
  };

  const handleMoveStatus = useCallback(
    async (reservationId, newStatus) => {
      await ReservationsService.updateStatus(reservationId, newStatus);
      fetchReservations();
      alert('Reservation updated!');
    }, [fetchReservations, alert]
  );

  return (
    <>
      { role === 'manager' &&
        <Card className="p-4">
          <Row xs="3" md="3" xl="6">
              {
                statuses.map((status) => (
                  <Col key={status.value} className="mb-2">
                    <StatusControl
                      text={status.text}
                      color={status.color}
                      active={filters.status === status.value}
                      onClick={handleChangeStatus(status.value)}
                    />
                  </Col>
                ))
              }
          </Row>
        </Card>
      }
      <div className="mt-3">
        { 
          reservations.length ? (
            <Row xs="1" md="1" lg="2" xl="3">
              {
                reservations.map((reservation) => (
                  <Col key={reservation._id} className="pb-2">
                    <ReservationCard reservation={reservation} onStatusChange={handleMoveStatus} onBlockUser={setBlockingUser} />
                  </Col>
                ))
              }
            </Row>
          ) : (
            <Card className="p-4 text-center">
              <h2>You don't have any reservations with this filter!</h2>
            </Card>
          )
        }
      </div>
      <ConfirmationDialog
        text="Are you sure you want to block this user?"
        isOpen={!!blockingUser}
        onCancel={() => setBlockingUser(false)}
        onConfirm={handleBlockUser}
      />
    </>
  );
};

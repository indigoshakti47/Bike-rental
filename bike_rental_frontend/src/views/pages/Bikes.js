import React from "react";

import ReservationsContainer from "../../components/Reservations/ReservationsContainer";
import ReservationsTable from "../../components/Reservations/ReservationsTable";

function Bikes() {

  return (
    <ReservationsContainer>
      <ReservationsTable />
    </ReservationsContainer>
  );
}

export default Bikes;

import { post, get } from '../api';

class ReservationsService {
  static async getReservations(params) {
    const { data } = await get('/reservations', { params });
    return data;
  }

  static async createReservation({ bikes, shop }) {
    const config = {
      data: { bikes, shop }
    };

    const { data } = await post('/reservations', config);
    return data;
  }

  static async updateStatus(reservationId, status) {
    const config = {
      data: { status },
    };

    const { data } = await post(`/reservations/${reservationId}/updateStatus`, config);

    return data;
  }
}

export default ReservationsService;

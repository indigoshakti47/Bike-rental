import { post, get, patch, del } from '../api';

class ReservationService {
    static async index(bikeId, params) {
        const config = {
            data: params
        };
        const { data } = await get(`/reservation/${bikeId}`, config);
        return data;
    }
    static async create(bikeId, params) {
        const config = {
            data: params
        };
        const { data } = await post(`/reservation/${bikeId}`, config);
        return data;
    }
    static async update(reservationId, updatedreservation) {
        const config = {
            data: updatedreservation,
        };
        const { data } = await patch(`/reservation/${reservationId}`, config);
        return data;
    }
    static async delete(reservationId) {
        const { data } = await del(`/reservation/${reservationId}`);
        return data;
    }
}

export default ReservationService;

import { post, get, patch, del } from '../api';

class BikeService {
  static async getBikes(params) {
    const { data } = await get('/bike', { params });
    return data;
  }
  static async getBikeById(bikeId) {
    const { data } = await get(`/bike/${bikeId}`);
    return data;
  }

  static async createBike(newBike) {
    const config = {
      data: newBike
    };

    const { data } = await post('/bike', config);
    return data;
  }

  static async updateBike(bikeId, updatedBike) {
    const config = {
      data: updatedBike,
    };

    const { data } = await patch(`/bike/${bikeId}`, config);

    return data;
  }

  static async deleteBike(bikeId) {
    const { data } = await del(`/bike/${bikeId}`);

    return data;
  }

  static async rating(bikeId, params) {
    const config = {
      data: params
    };
    const { data } = await post(`/rating/${bikeId}`, config);
    return data;
  }
}

export default BikeService;

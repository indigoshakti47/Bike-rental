import { post, get, patch, del } from '../api';

class BikeService {
  static async getBikes(params) {
    const { data } = await get('/bike', { params });
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
}

export default BikeService;

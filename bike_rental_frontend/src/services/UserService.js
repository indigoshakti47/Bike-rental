import { post, get } from '../api';

class UserService {
  static async blockUser(userId) {
    const { data } = await post(`/user/${userId}/block`);
    return data;
  }

  static async unblockUser(userId) {
    const { data } = await post(`/user/${userId}/unblock`);
    return data;
  }

  static async getById(userId) {
    const { data } = await get(`/user/${userId}`);
    return data;
  }
}

export default UserService;

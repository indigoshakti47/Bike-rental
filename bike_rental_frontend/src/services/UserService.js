import { post, get, patch, del } from '../api';

class UserService {
  static async getUsers() {
    const { data } = await get('/user');
    return data;
  }
  static async createUser(newUser) {
    const config = {
      data: newUser
    };
    const { data } = await post('/user', config);
    return data;
  }

  static async updateUser(userId, updatedUser) {
    const config = {
      data: updatedUser,
    };

    const { data } = await patch(`/user/${userId}`, config);

    return data;
  }

  static async deleteUser(userId) {
    const { data } = await del(`/user/${userId}`);
    return data;
  }
}

export default UserService;

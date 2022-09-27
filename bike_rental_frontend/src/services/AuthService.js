import { post } from '../api';

class AuthService {
  static async signUp({ name, email, password, roles }) {
    const options = {
      data: { name, email, password, roles },
    };

    const { data } = await post('/auth/signup', options);
    return data;
  }

  static async signIn({ email, password }) {
    const options = {
      data: { email, password }
    }
    
    const { data } = await post('/auth/signin', options);

    return data;
  }
}

export default AuthService;

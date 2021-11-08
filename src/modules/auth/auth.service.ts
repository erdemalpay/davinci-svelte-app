import { AuthResource } from './auth.resource';

class AuthService {
  private authResource = new AuthResource();

  async login(username: string, password: string) {
    return this.authResource.login(username, password);
  }

  async logout() {
    return this.authResource.logout();
  }
}

export default new AuthService();

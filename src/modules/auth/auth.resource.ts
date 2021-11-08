import { ApiResource } from '../../lib/api-decorators';
import { Api } from '../../lib/api.factory';

@ApiResource('/auth')
export class AuthResource extends Api {
  async login(username: string, password: string): Promise<void> {
    return this.post('/login', { username, password });
  }

  async logout(): Promise<void> {
    return this.post('/logout');
  }
}

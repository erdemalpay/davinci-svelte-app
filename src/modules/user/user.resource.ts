import { ApiResource } from '../../lib/api-decorators';
import { Api } from '../../lib/api.factory';
import type { User } from './user.interface';

@ApiResource('/user')
export class UserResource extends Api {
  async getProfile(): Promise<User> {
    return this.get('/profile');
  }

}

import { UserResource } from './user.resource';
import { user as userStore } from '../../store';

class UserService {
  userResource = new UserResource();

  async resolve() {
    const profile = await this.userResource.getProfile();
    userStore.setProfile(profile);
  }

  getUser() {
    return userStore.getUserSync();
  }
}

export default new UserService();

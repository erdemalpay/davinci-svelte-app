import { UserService } from '../modules';

export default class Resolver {
  static async resolve():Promise<void> {
    try {
      await UserService.resolve();
    } catch (err) {}
  }
}

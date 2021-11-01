import type { User } from './user.interface';
import { writable, get } from 'svelte/store';

export const createUserStore = () => {
  const userStore = writable<User>(null);

  const setProfile = (user: User) => userStore.set(user);
  const reset = () => userStore.set(null);
  const getUserSync = () => get(userStore);

  return {
    subscribe: userStore.subscribe,
    setProfile,
    reset,
    getUserSync,
  };
};

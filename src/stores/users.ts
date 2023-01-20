import { ref } from 'vue';
import { defineStore } from 'pinia';

export interface UserWithoutId {
  name: string;
  photo: string;
}

export interface User extends UserWithoutId {
  id: number;
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([
    {
      id: 1,
      name: 'Ana B. Smith',
      photo: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  ]);

  function addUser(user: User) {
    users.value.push(user);
  }

  function removeUser(id: number) {
    users.value = users.value.filter((user) => user.id !== id);
  }

  return {
    users,
    addUser,
    removeUser,
  };
});

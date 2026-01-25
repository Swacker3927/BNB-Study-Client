import { defineStore } from 'pinia';
import userApi from 'src/apis/userApi';

export default defineStore('useUser', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {

  },
  actions: {
    signInUser({ user, token }) {
      this.user = user;
      this.token = token;
      userApi.signInToken(token);
    },
    signOutUser() {
      this.user = null;
      this.token = null;
      userApi.signOutToken();
    }
  },
});

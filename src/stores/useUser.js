import { defineStore } from 'pinia';
import userApi from 'src/apis/userApi';
import { Cookies } from 'quasar';

export default defineStore('useUser', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isLogin(state) {
      return !!state.user;
    }
  },
  actions: {
    signInUser({ user, token }) {
      this.user = user;
      this.token = token;
      userApi.signInToken(token);
    },
    signOutUser() {
      if (!this.user) {
        throw new Error("이미 로그아웃되었습니다.")
      }
      const name = this.user.name;
      this.user = null;
      this.token = null;
      Cookies.remove('authToken');
      userApi.signOutToken();
      return name;
    }
  },
});

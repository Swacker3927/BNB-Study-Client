import { defineBoot } from '#q-app/wrappers';
import { Cookies } from 'quasar';
import userApi from 'src/apis/userApi';
import useUser from 'src/stores/useUser';

export default defineBoot(async ({ app, ssrContext, store }) => {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies; // otherwise we're on client

  try {
    if (cookies.has('authToken')) {
      const token = cookies.get('authToken');

      // token 인증 호출하고 user 정보가 오면 pinia에 등록합시다.
      const user = await userApi.auth(token);
      if (!user) {
        throw new Error("사용자 정보를 가져 올 수 없음.");
      }

      const userStore = useUser(store); // 서버에서는 store 사용해야함
      userStore.signInUser({ user, token });
    }
  } catch (e) {
    // console.log("ssr erroe", e.message)
    cookies.remove('authToken');
  }

});

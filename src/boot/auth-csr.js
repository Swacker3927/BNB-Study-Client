import { defineBoot } from '#q-app/wrappers'
import useUser from 'src/stores/useUser'
import userApi from 'src/apis/userApi';

export default defineBoot(async ({ app }) => {
  const userStore = useUser();
  // console.log('token', userStore.token)
  if (userStore.token) {
    userApi.signInToken(userStore.token);
  }
})

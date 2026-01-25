import { api } from 'boot/axios';
import createFormData from 'src/util/createFormData';
const URL = '/user';

const overlabCheck = async (email, controller) => {
  const data = await api.get(`${URL}/overlab/${email}`, {
    signal: controller.signal
  });
  return data;
};

const join = async (payload) => {
  // console.log('join', payload);
  const formData = createFormData(payload);
  const data = await api.post(`${URL}`, formData);
  return data;
};

const login = async (payload) => {
  const data = await api.post(`${URL}/login`, payload);
  return data;
};

const signInToken = (token) => {
  api.defaults.headers.common['Authorization'] = 'bearer ' + token;
};

const signOutToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

const auth = async (token) => {
  const user = await api.post(`${URL}/auth`, { token });
  return user;
};

export default {
  overlabCheck,
  join,
  login,
  signInToken,
  signOutToken,
  auth
};

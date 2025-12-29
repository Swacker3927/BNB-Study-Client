import { api } from 'boot/axios';
const URL = '/user';

const overlabCheck = async (email) => {
  const data = await api.get(`${URL}/overlab/${email}`);
  return data;
};


export default {
  overlabCheck
};

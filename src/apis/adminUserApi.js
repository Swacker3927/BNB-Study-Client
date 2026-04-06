import { api } from 'boot/axios';

const URL = '/admin/user'

const list = async (params) => {
  const data = await api.get(URL, { params });
  return data;
}

export default {
  list,
}

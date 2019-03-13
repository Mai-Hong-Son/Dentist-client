import { API } from './common';

export default {
  getList: async () => await API.get('api/products'),
  getListError: async () => await API.get('api/productsError')
};

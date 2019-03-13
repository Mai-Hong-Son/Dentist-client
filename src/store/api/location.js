import { API } from './common';

export default {
  fetchLocations: () => API.get('manages/adl1s'),
  fetchXrayLocations: id => API.get(`x-ray-locations/?filters[adl1_id]==${id}`),
};

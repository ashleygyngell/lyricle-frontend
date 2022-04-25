import axios from 'axios';

export const getKendrick = () => {
  return axios.get('http://api.genius.com/search?q=KendrickLamar', {
    headers: {
      Authorization: `Bearer ${process.env.client_access_token}`,
    },
  });
};

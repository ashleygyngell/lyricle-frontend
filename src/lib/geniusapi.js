import axios from 'axios';

export const getKendrick = () => {
  return axios.get(
    `${process.env.REACT_APP_API_SERVER}api.genius.com/search?q=KendrickLamar`,
    {
      headers: {
        Authorization: `Bearer ${process.env.client_access_token}`,
      },
    }
  );
};

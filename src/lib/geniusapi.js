import axios from 'axios';

export const getKendrick = (searchForArtist) => {
  return axios.get(`https://api.genius.com/search?q="${searchForArtist}"`, {
    headers: {
      Authorization: `Bearer ${process.env.client_access_token}`
    }
  });
};

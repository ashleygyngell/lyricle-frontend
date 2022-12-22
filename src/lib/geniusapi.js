import axios from 'axios';

export const getKendrick = (searchForArtist) => {
  return axios.get(
    `http://api.genius.com/search?q="${searchForArtist}"&access_token=${process.env.client_access_token}`
  );
};

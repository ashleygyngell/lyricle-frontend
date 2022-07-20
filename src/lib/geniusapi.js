import axios from 'axios';
import cheerio from 'cheerio';

export const getKendrick = (searchForArtist) => {
  return axios.get(
    `${process.env.REACT_APP_API_SERVER}http://api.genius.com/search?q=${searchForArtist}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.client_access_token}`,
      },
    }
  );
};

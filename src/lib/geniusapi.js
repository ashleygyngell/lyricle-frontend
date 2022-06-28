import axios from 'axios';
import cheerio from 'cheerio';

export const getKendrick = () => {
  return axios.get(
    `${process.env.REACT_APP_API_SERVER}http://api.genius.com/search?q=KendrickLamar`,
    {
      headers: {
        Authorization: `Bearer ${process.env.client_access_token}`,
      },
    }
  );
};

export const scrapeLyrics = () => {
  return axios.get(
    `${process.env.REACT_APP_API_SERVER}https://genius.com/Queen-bohemian-rhapsody-lyrics`,
    {
      headers: {
        Authorization: `Bearer ${process.env.client_access_token}`,
      },
    }
  );
};

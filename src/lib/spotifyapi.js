import axios from 'axios';

export const autoCorrectSong = () => {
  return axios.get(
    'https://spotify81.p.rapidapi.com/search?q=swimin%20pols%2C%20kendrick%20lamar&type=multi&offset=0&limit=10&numberOfTopResults=5',
    {
      params: {
        q: 'kendrick lamar swiming pool',
        type: 'multi',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5',
      },
      headers: {
        'X-RapidAPI-Key': '28fa7e1d77msh4969210312af748p13f318jsn62715d1354c9',
        'X-RapidAPI-Host': 'spotify81.p.rapidapi.com',
      },
    }
  );
};

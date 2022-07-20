import axios from 'axios';

export const spotifySearch = () => {
  return axios.get('https://spotify81.p.rapidapi.com/search', {
    params: {
      q: 'adele',
      type: 'multi',
      offset: '0',
      limit: '10',
      numberOfTopResults: '5',
    },
    headers: {
      'X-RapidAPI-Key': '28fa7e1d77msh4969210312af748p13f318jsn62715d1354c9',
      'X-RapidAPI-Host': 'spotify81.p.rapidapi.com',
    },
  });
};

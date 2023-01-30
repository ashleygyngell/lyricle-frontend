import axios from 'axios';

export const getKendrick = (searchForArtist) => {
  return axios.get(
    `https://api.genius.com/search?q="${searchForArtist}"&access_token=${process.env.client_access_token}`
  );
};

export const getPlaylistFromApi = () => {
  return axios.get(
    `https://spotify81.p.rapidapi.com/playlist?id=37i9dQZF1DX4o1oenSJRJd`,
    {
      headers: {
        'X-RapidAPI-Key': '28fa7e1d77msh4969210312af748p13f318jsn62715d1354c9',
        'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
      }
    }
  );
};

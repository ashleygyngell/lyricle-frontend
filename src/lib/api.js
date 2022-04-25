import axios from 'axios';

const baseUrl = 'https://lyriclegamedb.herokuapp.com';

export const registerUser = (user) => {
  return axios.post(`${baseUrl}/authentication/register/`, user);
};

export const loginUser = (user) => {
  console.log(user);
  return axios.post(`${baseUrl}/authentication/login/`, user);
  //   headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  // });
};

export const joinLeague = () => {
  const accessToken = localStorage.getItem('accessToken');
  console.log(`Bearer ${localStorage.getItem('accessToken')}`);
  if (!accessToken) return false;
  return axios.put(`${baseUrl}/authentication/joinleague/3/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
};

export const createLeague = (leagueName) => {
  console.log(leagueName);
  const accessToken = localStorage.getItem('accessToken');
  console.log(`Bearer ${localStorage.getItem('accessToken')}`);
  if (!accessToken) return false;
  return axios.post(`${baseUrl}/leagues/`, leagueName);
};

// export const createleague = (leagueinfo) => {
//   return axios.post(`${baseUrl}/leagues/`, leagueinfo, {
//     headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
//   });
// };

export const getLoggedInUserId = (user) => {
  // const token = localStorage.getItem('token');
  // if (!token) return false;
  // const userObject = JSON.parse(window.atob(token.split('.')[1]));
  // return userObject, user;
};

export const getUserById = () => {
  const accessToken = localStorage.getItem('accessToken');
  console.log(`Bearer ${localStorage.getItem('accessToken')}`);
  if (!accessToken) return false;
  return axios.get(`${baseUrl}/authentication/credentials/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
};

export const getUserLeagues = () => {
  const accessToken = localStorage.getItem('accessToken');
  console.log(`Bearer ${localStorage.getItem('accessToken')}`);
  if (!accessToken) return false;
  return axios.get(`${baseUrl}/leagues/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
};

// export const getUserById = async () => {
//   const options = {
//     method: 'GET',
//     url: '/api/authentication/credentials',
//   };

//   const { data } = await axios.request(options);

//   return data;
// };

import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const getAllCheeses = () => {
  return axios.get(`${baseUrl}/cheeses`);
};

export const getSingleCheese = (id) => {
  return axios.get(`${baseUrl}/cheeses/${id}`);
};

export const registerUser = (user) => {
  return axios.post(`${baseUrl}/authentication/register/`, user);
};

export const loginUser = (user) => {
  return axios.post(`${baseUrl}/authentication/login/`, user);
  //   headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  // });
};

export const createCheese = (cheese) => {
  return axios.post(`${baseUrl}/cheeses`, cheese, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
};

import axios from 'axios';

const baseUrl = 'https://ga-cheesebored.herokuapp.com';

export const getAllCheeses = () => {
  return axios.get(`${baseUrl}/cheeses`);
};

export const getSingleCheese = (id) => {
  return axios.get(`${baseUrl}/cheeses/${id}`);
};

export const registerUser = (user) => {
  return axios.post(`${baseUrl}/register`, user)
}

export const loginUser = (user) => {
  return axios.post(`${baseUrl}/login`, user)
}

export const createCheese = (cheese) => {
  return axios.post(`${baseUrl}/cheeses`, cheese, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } 
  })
}
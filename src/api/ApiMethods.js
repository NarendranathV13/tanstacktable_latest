import axios from 'axios';
const api = axios.create({
    baseURL: `https://64db5089593f57e435b0c522.mockapi.io/`,
});
const GetAxiosData = (apiUrl, params) => {
  return api.get(apiUrl, { params });
}
export { GetAxiosData};
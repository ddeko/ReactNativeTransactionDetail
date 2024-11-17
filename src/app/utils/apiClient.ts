import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://recruitment-test.flip.id',
  timeout: 5000,
});

export default apiClient;

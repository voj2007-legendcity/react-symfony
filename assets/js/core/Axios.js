import axios from 'axios';
const Axios = axios.create({
  baseURL: 'https://doingwell.ru',
  timeout: 30000,
  headers: {'X-Requested-With': 'XMLHttpRequest'}
});
export default Axios;
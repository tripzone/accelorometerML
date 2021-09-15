import axios from 'axios';

export const sendData = (type, data) =>
  axios.post('http://192.168.0.108:3000/data', { [type]: data });

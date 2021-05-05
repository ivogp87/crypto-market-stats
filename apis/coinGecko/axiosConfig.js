import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const coinGecko = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default coinGecko;

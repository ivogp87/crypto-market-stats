import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.EXPO_PUBLIC_COINGECKO_API_KEY;

const coinGecko = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'x-cg-demo-api-key': API_KEY,
  },
});

export default coinGecko;

import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'cdf1a61e9af2b38de94b6272c964d528',
    language: 'es-ES',
  },
});

export default movieDB;

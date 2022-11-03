import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {MoviDBMoviesResponse, Movie} from '../interfaces/movieInterface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
	nowPlaying:[],
	popular:[],
	topRated:[],
	upcoming:[],
  });

  const getMovies = async () => {
    const nowPlayingPromise = movieDB.get<MoviDBMoviesResponse>('/now_playing');
    const populaPromiser = movieDB.get<MoviDBMoviesResponse>('/popular');
    const topRatedPromise = movieDB.get<MoviDBMoviesResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MoviDBMoviesResponse>('/upcoming');

    const resps = await Promise.all([nowPlayingPromise, populaPromiser, topRatedPromise, upcomingPromise]);

    setMoviesState({
	nowPlaying: resps[0].data.results,
	popular: resps[1].data.results,
	topRated: resps[2].data.results,
	upcoming: resps[3].data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    //now_playing
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};

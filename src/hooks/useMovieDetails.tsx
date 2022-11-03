import {useEffect, useState} from 'react'
import movieDB from '../api/movieDB';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieInterface';

interface MovieDatails{
	isLoading: boolean;
	movieFull?: MovieFull;
	cast: Cast[];
}

export const useMovieDetails = ( movieId: number ) => {

	const [state, setState] = useState<MovieDatails>({
		isLoading: true,
		movieFull: undefined,
		cast: [],
	});
  
	const getMovieDetail =  async() =>{		
		const movieDetailPromise = movieDB.get<MovieFull>(`/${ movieId }`);
		const castPromise = movieDB.get<CreditsResponse>(`/${ movieId }/credits`);

		const [movieDetailResp, castPromiseResp] = await Promise.all([movieDetailPromise,castPromise]);

		setState({
			isLoading: false,
			movieFull: movieDetailResp.data,
			cast: castPromiseResp.data.cast
		})
	}

	useEffect(() => {	  
		getMovieDetail();	
	}, [])

	return{
		...state
	}
	
}

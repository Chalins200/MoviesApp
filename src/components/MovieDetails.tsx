import React from 'react';
import {FlatList, Text, View} from 'react-native';
import currencyFormatter from 'currency-formatter';

import {Cast} from '../interfaces/creditsInterface';
import {MovieFull} from '../interfaces/movieInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import { CastItem } from './CastItem';

interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

export const MovieDetails = ({movieFull, cast}: Props) => {
  return (
    <>
      {/* Detalles */}
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="star-outline" color="grey" size={16} />
          <Text> {movieFull.vote_average} </Text>
          <Text> - {movieFull.genres.map(g => g.name).join(', ')} </Text>
        </View>

        {/* Historia */}
		<Text style={{fontSize: 23, marginTop: 10, fontWeight:'bold' }}>Historia</Text>
		<Text style={{fontSize: 16 }}>{ movieFull.overview }</Text>

		{/* Presupuesto */}
		<View style={{ marginTop: 10, marginBottom:10 }}>
			<Text style={{fontSize: 23, marginTop: 10, fontWeight:'bold' }}> 
				Presupuesto 
			</Text>
			<Text style={{fontSize: 18 }}> 
				{ 
					currencyFormatter.format( movieFull.budget , { code:'USD' }) 
				} 
			</Text>
        </View>

		{/* Casting */}
		<View style={{ marginBottom: 5}}>
			<Text style={{fontSize: 23, marginTop: 10, fontWeight:'bold' }}>Actores</Text>					
		</View>			
		
      </View>
	  <FlatList
				data={ cast }
				keyExtractor={ (item) => item.id.toString() }
				renderItem={ ({ item }) => <CastItem actor={ item } />}
				horizontal= { true }
				showsHorizontalScrollIndicator= { false}
				style={{ height: 70, marginHorizontal: 10}}
			/>	
    </>
  );
};

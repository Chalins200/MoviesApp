import React, { useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import ImageColors from 'react-native-image-colors'

import {GradientBackground} from '../components/GradientBackground';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

const {width: windowsWidth} = Dimensions.get('window');
const screenHeight = Dimensions.get('screen').height;

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const { setMainColor } = useContext(GradientContext);

  const getPosterColors = async( index: number ) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary = 'green', secondary = 'orange' ] = await getImageColors(uri);

    setMainColor({primary, secondary});

  }

  useEffect(() => {
    if(nowPlaying.length > 0){
      getPosterColors(0);
    }
    
  }, [nowPlaying])
  

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/* Carosel Principal */}
          <View style={{height: screenHeight * 0.5}}>
            {/* Carosel Principal */}
            <Carousel
              data={nowPlaying}
              renderItem={({item}: any) => (
                <MoviePoster movie={item} height={screenHeight * 0.5} />
              )}
              sliderWidth={windowsWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem= { index => getPosterColors(index) }
            />
          </View>

          {/* Peliculas populares */}
          <HorizontalSlider title="Popular" movies={popular} />
          <HorizontalSlider title="Top Rated" movies={topRated} />
          <HorizontalSlider title="Upcoming" movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

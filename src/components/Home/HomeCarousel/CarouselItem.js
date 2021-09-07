import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import BaseImage from '../../BaseImage';

const {width, height} = Dimensions.get('screen');

const CarouselItem = ({item}) => {
  return (
    <View style={styles.cardView}>
      <BaseImage style={styles.image} source={{uri: item.image_url}} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    height: height / 4 - 25 - (height/18),
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    width: width - 20,
    height: height / 4 - 25 - (height/18),
    borderRadius: 10,
  },
});

export default CarouselItem;

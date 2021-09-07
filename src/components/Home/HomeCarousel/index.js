import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import CarouselItem from './CarouselItem';
import {Colors} from '../../../assets/colors/Colors';
import Consts from '../../../functions/Consts';

const HomeCarousel = ({data}) => {
  const [dataList, setDataList] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setDataList(data);
  }, [data]);

  const renderItem = ({item}) => {
    return <CarouselItem item={item} />;
  };


  if (data && data.length) {
    return (
      <View style={styles.container}>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    width: Consts.windowWidth,
    alignItems: 'center',
    paddingBottom: 0
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.blueLight,
    marginHorizontal: -4,
  },
  inactiveDotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EDEDED",
  },
});

export default HomeCarousel;

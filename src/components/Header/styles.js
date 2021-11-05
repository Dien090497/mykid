import {Colors} from '../../assets/colors/Colors';
import {StyleSheet, Dimensions} from 'react-native';
import { FontSize } from '../../functions/Consts';

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorMain,
    borderBottomEndRadius:10,
    borderBottomStartRadius:10,
  },
  title: {
    fontSize: FontSize.medium,
    fontFamily: 'Roboto-Bold',
    color: Colors.white,
    width: '130%',
    marginTop: 3,
    textAlign: 'center'
  },
  back: {
    padding: height * 0.005,
    margin: -height * 0.005,
    width: width * 0.1
  },
  iconRight: {
    height: 28,
    width: 28
  },
});

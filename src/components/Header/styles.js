import {Colors} from '../../assets/colors/Colors';
import {StyleSheet} from 'react-native';
import { FontSize } from '../../functions/Consts';

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
  },
  iconRight: {
    height: 28,
    width: 28
  },
});

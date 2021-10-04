import {Colors} from '../../assets/colors/Colors';
import {StyleSheet} from 'react-native';
import { FontSize } from '../../functions/Consts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.redTitle,
  },
  title: {
    fontSize: FontSize.big*0.8,
    fontFamily: 'Roboto-Bold',
    color: Colors.white,
    marginTop: 3
  },
  back: {
  },
});
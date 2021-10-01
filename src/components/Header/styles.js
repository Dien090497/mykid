import {Colors} from '../../assets/colors/Colors';
import {StyleSheet} from 'react-native';
import { FontSize } from '../../functions/Consts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.red,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: FontSize.xtraBig,
    fontFamily: 'Roboto-Bold',
    color: Colors.white,
    marginTop: 3
  },
  back: {
  },
});
import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/colors/Colors';

export const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    color: Colors.blueTitle,
  },
  back: {
    position: 'absolute',
    left: 5,
    padding: 10,
  },
});
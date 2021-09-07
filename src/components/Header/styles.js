import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/colors/Colors';

export const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blueTitle,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: Colors.white
  },
  back: {
    position: 'absolute',
    left: 5,
    padding: 10,
  },
});
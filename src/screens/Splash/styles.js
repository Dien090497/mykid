import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/colors/Colors';
import Consts from '../../functions/Consts';

export const styles = StyleSheet.create({
  container: {
    height: '70%',
    width: '100%',
    backgroundColor: Colors.white,
    paddingTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomContainer: {
    marginTop: -30,
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  splashImg: {
    width: Consts.windowWidth,
    height: Consts.windowWidth,
  },
});

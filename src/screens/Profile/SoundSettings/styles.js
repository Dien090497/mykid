import {StyleSheet} from 'react-native';
import { FontSize } from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  radioForm: {
    width: '96%',
    alignSelf: 'center',
    marginBottom: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: Colors.grayButton,
    flexDirection: 'row',
  },
  labelStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: FontSize.big,
  }
});

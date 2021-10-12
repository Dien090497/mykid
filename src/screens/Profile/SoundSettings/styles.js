import {StyleSheet, Dimensions} from 'react-native';
import { FontSize } from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

const {width, height} = Dimensions.get('window');
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
    width: '90%',
    alignSelf: 'center',
    paddingVertical: height* 0.02,
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    shadowColor: Colors.gray,
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 },
    elevation: 4,
    marginTop: height* 0.02
  },
  labelStyle: {
    fontSize: FontSize.big,
    color: Colors.colorTextPlus,
    fontWeight: '700',
    fontStyle: 'normal'
  }
});

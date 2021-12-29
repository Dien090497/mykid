import {StyleSheet, Dimensions} from 'react-native';
import { FontSize, ScaleHeight } from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

const {width,height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  textPlus: {
    alignSelf: 'center',
    width: '90%',
    fontSize: FontSize.medium,
    fontWeight: '400',
    color: Colors.colorTextPlus,
    marginBottom: height* 0.015,
    fontFamily: 'Roboto',
  },
  button: {
    height: ScaleHeight.medium,
    backgroundColor: Colors.red,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: FontSize.medium,
    fontFamily: 'Roboto-Bold',
  },
  iconClock: {
    width: 102,
    height: 100,
    marginTop: -height* 0.02
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayBgBtnHome,
    height: '30%',
    width: '100%',
    marginVertical: height* 0.04,
  },
  viewText: {
    marginHorizontal: width* 0.02,
    height: '30%'
  }
});

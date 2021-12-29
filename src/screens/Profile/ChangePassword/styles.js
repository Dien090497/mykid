import {StyleSheet, Dimensions} from 'react-native';
import {FontSize, ScaleHeight} from '../../../functions/Consts';
import {Colors} from "../../../assets/colors/Colors";

const {width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  Sty_txtPass: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
  viewButton: {
    width: '100%',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tobSubmit: {
    backgroundColor: Colors.red,
    width: width * 0.88 + 10,
    height: ScaleHeight.medium ,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  txtConfirm: {
    color: Colors.white,
    fontSize: FontSize.medium,
    fontFamily: 'Roboto-Medium',
  }
});

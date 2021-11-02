import {StyleSheet, Dimensions} from 'react-native';
import {FontSize, ScaleHeight} from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Sty_txt: {
    marginTop: 25,
    width: width * 0.9,
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    height: ScaleHeight.medium * 1.2,
    borderWidth: 1,
    borderColor: Colors.borderInputText,
  },
  textInput: {
    color: "#000000",
    width: width * 0.88,
    height: ScaleHeight.medium,
    marginLeft: 10,
    fontSize: FontSize.small
  },
  viewInput: {
    width: '75%',
    borderWidth: 1,
    borderColor: Colors.borderInputText,
    justifyContent: 'center',
    borderRadius: 10,
    height: ScaleHeight.medium * 1.2,
  },
  viewOtp: {
    width: width * 0.9,
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
    height: ScaleHeight.medium * 1.2,
  },
  tobOtp: {
    width: '23%',
    backgroundColor: Colors.redTitle,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: '2%'
  },
  text: {
    fontSize: FontSize.small,
    fontWeight: '400',
    fontStyle: 'normal',
    color: 'rgba(128, 128, 128, 1)'
  },
  btnSubmit: {
    backgroundColor: Colors.colorMain,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: ScaleHeight.medium * 1.2,
    width: '90%',
    marginTop: ScaleHeight.small * 1.5,
  },
  textSubmit: {
    fontFamily: 'Roboto-Medium',
    fontSize: FontSize.small,
    color: Colors.white
  },
});

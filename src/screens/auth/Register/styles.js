import {StyleSheet, Dimensions} from 'react-native';
import {FontSize, ScaleHeight} from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';
const { width } = Dimensions.get('window');

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
    height:  ScaleHeight.medium
  },
  txtPolicy: {
    fontWeight: '500',
    fontSize: FontSize.xtraSmall,
    color: Colors.red,
    textDecorationLine: 'underline',
    fontFamily: 'Roboto',
  },
  txtPolicy1: {
    fontWeight: '500',
    fontSize: FontSize.xtraSmall,
    color: Colors.red,
    textDecorationLine: 'underline',
    marginLeft: -15,
    fontFamily: 'Roboto',
  },
  txt_Policy: {
    fontSize: FontSize.xtraSmall,
    marginTop: 15,
    marginLeft: -15,
    width: width - 55,
    color: '#808080',
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  btnSubmit:{
    backgroundColor: Colors.colorMain,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    height: ScaleHeight.medium,
    width: width* 0.9,
    marginTop: ScaleHeight.small * 1.5,
  },
  textSubmit:{
    fontFamily:'Roboto-Medium',
    fontSize:FontSize.small,
    color: Colors.white,
  },
});

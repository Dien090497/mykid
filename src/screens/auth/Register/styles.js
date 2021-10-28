import {StyleSheet, Dimensions} from 'react-native';
import {FontSize, ScaleHeight} from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    paddingHorizontal: 20,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Sty_txt: {
    marginTop: 25,
    width: width* 0.9,
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },
  Sty_iconCode: {
    width: 120,
    height: 27,
  },
  Sty_iconReset: {
    width: 25,
    height: 25,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#009900',
  },
  Sty_iconCheckbox: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    height: 20,
    width: 20,
  },
  txtPolicy: {
    fontWeight: '500',
    fontSize: FontSize.xtraSmall,
    color: Colors.red,
    textDecorationLine: 'underline',
  },
  txtPolicy1: {
    fontWeight: '500',
    fontSize: FontSize.xtraSmall,
    color: Colors.red,
    textDecorationLine: 'underline',
    marginLeft: -15
  },
  txt_Policy: {
    fontSize: FontSize.xtraSmall,
    marginTop: 15,
    marginLeft: -15,
    width: width - 55,
    color: '#808080'
  },
  viewButton: {
    width: '96%',
    marginTop: 50,
    justifyContent: 'center',
    marginLeft: '2%'
  },
  btnSubmit:{
    backgroundColor: Colors.colorMain,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    height: ScaleHeight.medium,
    width: width* 0.9,
    marginTop: ScaleHeight.small* 1.5,
  },
  textSubmit:{
    fontFamily:'Roboto-Medium',
    fontSize:FontSize.small,
    color: Colors.white
  },
});

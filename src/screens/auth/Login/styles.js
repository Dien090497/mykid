import Consts ,{ FontSize,ScaleHeight } from '../../../functions/Consts';
import {Dimensions, StyleSheet} from 'react-native';

import {Colors} from '../../../assets/colors/Colors';

const { width} = Dimensions.get("window");
const height = Consts.windowHeight;

export const styles = StyleSheet.create({
  btnClose: {
    position: 'absolute',
    zIndex: 99,
    top: 35,
    right: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  image: {
    flex: 1,
    height:height,
    resizeMode: 'contain',
    paddingHorizontal: 20,
    alignItems: "center"
  },
  banner:{
    width:'100%',
    height:height*0.25,
    resizeMode:'stretch',
    marginHorizontal:16,
    marginVertical:30,
  },
  title:{
    fontFamily:'Roboto-Medium',
    fontSize: FontSize.xxtraBig,
    color: '#5F5F5F',
  },
  textInput:{
    width:'100%',
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth:1,
    color:'#B5B4B4',
    borderColor:'#E7E7E7',
    paddingHorizontal:10,
    marginTop:20,
    fontSize: FontSize.xtraSmall,
    height: ScaleHeight.medium
  },
  ViewResetPass: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",
    marginVertical:15
  },
  txtRegister: {
    color: '#EE0033',
    marginRight: 5,
    textDecorationLine: "underline",
    textDecorationStyle: 'solid',
    fontSize:FontSize.small,
  },
  btnSubmit:{
    backgroundColor: Colors.colorMain,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    height: ScaleHeight.medium
  },
  textSubmit:{
    fontFamily:'Roboto-Medium',
    fontSize:FontSize.small,
    color: Colors.white
  },
  Sty_iconCheckbox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    height: 20,
    width: 20,
    borderColor: '#3CB371',
  },
  Sty_Checkbox: {
    borderRadius: 10,
    backgroundColor: "#3CB371",
    height: 15,
    width: 15,
    borderColor: '#FFFFFF',
  },
  txtPolicy: {
    fontFamily:'Roboto-Medium',
    fontSize: FontSize.xtraSmall,
    color: Colors.colorMain,
    textDecorationLine: "underline",
  },
  txt_Policy: {
    fontSize: FontSize.xtraSmall,
    marginTop: 15,
    marginLeft: -10,
    width: width - 60,
    color:'#808080'
  },
});

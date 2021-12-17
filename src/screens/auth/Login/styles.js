import Consts, {FontSize, ScaleHeight} from '../../../functions/Consts';
import {Dimensions, StyleSheet} from 'react-native';

import {Colors} from '../../../assets/colors/Colors';

const {width} = Dimensions.get("window");
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
    height: 'auto',
    minHeight: height * 0.96,
    width: width,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  banner: {
    width: '100%',
    height: height * 0.25,
    resizeMode: 'stretch',
    marginHorizontal: height * 0.016,
    marginVertical: height * 0.025,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: FontSize.xxtraBig,
    color: '#5F5F5F',
  },
  textInput: {
    width: '100%',
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    color: Colors.black,
    borderColor: '#E7E7E7',
    paddingHorizontal: 10,
    marginTop: height * 0.02,
    fontSize: FontSize.xtraSmall,
    height: ScaleHeight.medium,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    fontWeight: '400',
 },
  ViewResetPass: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",
    marginVertical: height * 0.015
  },
  txtRegister: {
    color: '#EE0033',
    marginRight: 5,
    textDecorationLine: "underline",
    textDecorationStyle: 'solid',
    fontSize: FontSize.small,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  btnSubmit: {
    backgroundColor: Colors.colorMain,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: ScaleHeight.medium
  },
  textSubmit: {
    fontFamily: 'Roboto-Medium',
    fontSize: FontSize.small,
    color: Colors.white,
    fontStyle: 'normal',
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
    fontFamily: 'Roboto-Medium',
    fontSize: FontSize.xtraSmall,
    color: Colors.colorMain,
    textDecorationLine: "underline",
    fontStyle: 'normal',
  },
  txt_Policy: {
    fontSize: FontSize.xtraSmall,
    marginLeft: -width * 0.03,
    width: width - width * 0.12,
    color: '#808080',
    alignItems: 'center',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    fontWeight: '500'
  },
  modalView: {
    flex: 1,
    flexDirection: 'column'
  },
  modalViewTob: {
    width: '100%',
    height: height / 1.5,
    backgroundColor: 'rgba(1, 1, 1, 0.3)'
  },
  wheelPickerView: {
    backgroundColor: 'white',
    width: '100%',
    height: height - height / 1.5,
    flexDirection: 'column'
  },
  tobWheel: {
    width: '100%',
    height: height - height / 1.5 - height / 4
  },
  confirmView: {
    width: '100%',
    height: height / 15,
    backgroundColor: Colors.colorConfirmPicker,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  textConfirm: {
    color: Colors.colorMain,
    fontSize: FontSize.small,
    position: 'absolute',
    right: width * 0.03,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
  },
  wheel: {
    width: "100%",
    height: height / 4
  },
  viewConfirm: {
    width: '100%',
    marginTop: height * 0.01,
    justifyContent: 'center',
  },
  viewCheckBox: {
    flexDirection: 'row',
    width: width - width * 0.1,
    marginHorizontal: height * 0.04,
    marginTop: height * 0.012,
    alignItems: 'center'
  },
  viewLanguage: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  checkBox: {
    marginLeft: -width * 0.048
  }
});

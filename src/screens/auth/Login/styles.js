import Consts, { FontSize } from '../../../functions/Consts';
import {Dimensions, StyleSheet} from 'react-native';

import {Colors} from '../../../assets/colors/Colors';

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
    resizeMode: 'cover',
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  ViewResetPass: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between"
  },
  txtRegister: {
    color: '#4169E1',
    marginRight: 5
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
    fontWeight: "700",
    fontSize: FontSize.medium,
    color: Colors.red,
    textDecorationLine: "underline",
  },
  txt_Policy: {
    fontSize: FontSize.small,
    marginLeft: 5,
  },
});

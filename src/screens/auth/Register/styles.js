import {StyleSheet, Dimensions} from 'react-native';
import Consts from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

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
  Sty_txtCode: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  Sty_iconCode: {
    width: "100%",
    height: 30,
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
    borderColor: "#009900",
  },
  Sty_iconCheckbox: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    height: 20,
    width: 20,
  },
  txtPolicy: {
    fontWeight: "700",
    fontSize: 13,
    color: "#00CCCC",
    textDecorationLine: "underline",
  },
  txt_Policy: {
    fontSize: 13,
    marginLeft: 5,
  },
});

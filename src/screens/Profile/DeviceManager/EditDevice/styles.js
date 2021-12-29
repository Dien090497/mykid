import Consts, { FontSize, ScaleHeight } from "../../../../functions/Consts";

import { Colors } from "../../../../assets/colors/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containText: {
    color: Colors.colorTextPlus,
    fontSize: FontSize.medium,
    fontFamily: "Roboto-Medium"
  },
  viewContain: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderInputText,
    flexDirection: "row",
    height: ScaleHeight.medium,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  textNickName: {
    color: Colors.grayTextTitleColor,
    fontSize: FontSize.small,
    fontFamily: "Roboto",
    paddingHorizontal: '2%'
  },
  input: {
    width: "100%",
    height: ScaleHeight.medium,
    borderRadius: 10,
    borderColor: "#E7E7E7",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  iconInput: {
    height: "80%",
    width: ScaleHeight.medium,
  },
  button: {
    marginTop: 40,
    height: ScaleHeight.medium,
    backgroundColor: Colors.colorMain,
    width: '100%',
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
  txt: {
    flex: 1,
    color: Colors.black ,
    fontSize: FontSize.small
  },
  txtInput: {
    flex: 1,
    color: Colors.colorHeader,
    fontSize: FontSize.small,
    fontFamily: 'Roboto',
    fontWeight: '500'
  },
  txtId: {
    color: Colors.black,
    marginLeft: '4%',
    fontSize: FontSize.small,
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  txtDevices: {
    color: Colors.colorHeader,
    marginLeft: '1%' ,
    fontFamily: 'Roboto',
    fontWeight: '500',
  }
});

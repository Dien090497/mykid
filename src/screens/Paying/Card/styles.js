import {StyleShee} from "react-native";
import {ScaleHeight} from "../../../functions/Consts";
import {Colors} from "../../../assets/colors/Colors";

export const styles = StyleSheet.create({
  viewTxt: {
    width: '100%',
    height: ScaleHeight.medium,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    color: Colors.black
  },
  viewInput: {
    width: '100%',
    borderColor: 'rgba(231, 231, 231, 1)',
    borderWidth: 0.5,
    borderRadius: 10,
    color: Colors.black,
    justifyContent: 'center',
    height: ScaleHeight.medium * 1.2,
    padding: 10,
  },
  viewTob: {
    backgroundColor: Colors.redTitle,
    marginVertical: 30,
    height: ScaleHeight.medium * 1.2,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtTob: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '500',
  },
  viewContent: {
    width: '100%',
    height: 'auto',
    padding: 10,
  },
  txtContent: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 20
  }
})
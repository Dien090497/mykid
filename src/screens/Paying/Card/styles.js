import {StyleSheet, Dimensions} from "react-native";
import { FontSize, ScaleHeight } from "../../../functions/Consts";
import {Colors} from "../../../assets/colors/Colors";

const {height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  viewTxt: {
    width: '100%',
    height: ScaleHeight.medium,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: ScaleHeight.medium * 1.2 / 3.5,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    color: Colors.grayTxt
  },
  viewInput: {
    width: '100%',
    borderColor: 'rgba(231, 231, 231, 1)',
    borderWidth: 0.5,
    borderRadius: 10,
    color: Colors.black,
    justifyContent: 'center',
    height: ScaleHeight.medium * 1.2,
  },
  viewTob: {
    backgroundColor: Colors.redTitle,
    marginVertical: height * 0.03,
    height: ScaleHeight.medium * 1.2,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtTob: {
    fontSize: ScaleHeight.medium * 1.2 / 3.5,
    color: Colors.white,
    fontWeight: '500',
  },
  viewContent: {
    width: '100%',
    height: 'auto',
    padding: 10,
  },
  txtContent: {
    fontSize: FontSize.xtraSmall,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    lineHeight: height * 0.035,
    color: Colors.grayTxt
  }
})

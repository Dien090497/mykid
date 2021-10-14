import Consts, {FontSize, ScaleHeight} from '../../../functions/Consts';

import {Colors} from '../../../assets/colors/Colors';
import {Dimensions, StyleSheet} from 'react-native';
import {ScreenHeight} from "react-native-elements/dist/helpers";

const settingHeight = (Consts.screenHeight /
  (Consts.screenHeight < 800 ? Math.floor(Consts.screenHeight / 50) : Math.floor(
    Consts.screenHeight / 70)));
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: width* 0.04
  },
  rowSettings: {
    paddingVertical: '1%',
    marginVertical: height* 0.015,
    borderRadius: 10,
    height: ScaleHeight.medium* 1.2,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  rowPlus: {
    paddingVertical: '1%',
    height: ScaleHeight.medium,
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
    borderWidth: 1,
    borderColor: Colors.redTitle,
    marginVertical: height* 0.02
  },
  textPlus: {
    fontSize: FontSize.medium,
    marginTop: '1%',
    fontFamily: 'Roboto-Bold',
    fontWeight: '500',
    color: Colors.redTitle
  },
  iconSetting: {
    marginLeft: '1%',
    height: 40,
    width: 40,
    aspectRatio: 1,
  },
  textSettings: {
    fontSize: 16,
    minWidth: '50%',
    marginLeft: '5%',
    fontFamily: 'Roboto-Medium',
    fontWeight: '500'
  },
  textChange: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    color: Colors.white
  },
  textCheck: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    color: Colors.white
  },
  btnChange: {
    justifyContent: 'center',
    backgroundColor: Colors.redTitle,
    borderRadius: 10,
    width: width* 0.22,
    height: height* 0.045
  },
  viewCurrent: {
    justifyContent: 'center',
    backgroundColor: 'rgba(238, 0, 51, 0.3)' ,
    alignItems: 'center',
    borderRadius: 10,
    width: width* 0.22,
    height: height* 0.045
  },
  btnDelete: {
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.redTitle,
    width: width* 0.22,
    height: height* 0.045
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'column'
  },
  modal: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    flexDirection:'column'
  },
  tobModal: {
    flexDirection: 'column',
    width: '85%',
    height: '25%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tobView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
  },
  textModel: {
    fontSize: 18,
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '500'
  },
  tob: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButton: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.red,
    backgroundColor: Colors.white,
    width: width* 0.3,
    height: height* 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.small
  },
  TobOpacity: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

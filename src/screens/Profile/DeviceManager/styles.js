import {StyleSheet} from 'react-native';
import Consts, { FontSize } from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

const settingHeight = (Consts.screenHeight /
  (Consts.screenHeight < 800 ? Math.floor(Consts.screenHeight / 50) : Math.floor(
    Consts.screenHeight / 70)));
    
export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.whiteDark,
  },
  rowSettings: {
    paddingVertical: '1%',
    height: settingHeight,
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: Colors.graySearch,
    borderBottomWidth: 1,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center"
  },
  rowPlus: {
    marginVertical: 15,
    paddingVertical: '1%',
    height: settingHeight,
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: Colors.graySearch,
    borderBottomWidth: 1,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center'
  },
  txtPlus: {
    // height: settingHeight,
    // marginTop: '1%',
    // height: '80%',
    width: '7%',
    aspectRatio: 1,
    fontSize: FontSize.xxxtraBig,
    fontFamily: 'Roboto-Bold',
    color: Colors.gray
  },
  textPlus: {
    // height: settingHeight,
    fontSize: FontSize.big,
    marginTop: '1%',
    fontFamily: 'Roboto-Bold',
    color: Colors.gray
  },
  iconSetting: {
    marginLeft: '2%',
    height: '80%',
    width: '8%',
    aspectRatio: 1,
  },
  textSettings: {
    fontSize: FontSize.big,
    minWidth: '50%',
    marginLeft: '5%',
    marginTop: '1%',
    fontFamily: 'Roboto-Medium',
  },
  textSettings1: {
    fontSize: FontSize.big,
    width: '80%',
    marginLeft: '5%',
    marginTop: '1%',
    fontFamily: 'Roboto-Medium',
  },
  textChange: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    // marginVertical: 8,
    // marginHorizontal: 20,
    color: Colors.white
  },
  textCheck: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    // marginVertical: 8,
    // marginHorizontal: 20,
    color: Colors.white
  },
  btnChange: {
    justifyContent: 'center',
    backgroundColor: 'green',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    height: 35
  },
  viewCurrent: {
    justifyContent: 'center',
    backgroundColor: 'green',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    height: 35
  },
});

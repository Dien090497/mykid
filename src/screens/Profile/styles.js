import {StyleSheet, Platform, StatusBar} from 'react-native';
import Consts, { FontSize } from '../../functions/Consts';
import {Colors} from '../../assets/colors/Colors';

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
  iconSetting: {
    marginLeft: '2%',
    height: '80%',
    width: '8%',
    aspectRatio: 1,
  },
  textSettings: {
    fontSize: 15,
    width: '75%',
    marginLeft: '5%',
    marginTop: '1%',
    fontFamily: 'Roboto-Medium',
  },
  textSettings1: {
    fontSize: 15,
    width: '80%',
    marginLeft: '5%',
    marginTop: '1%',
    fontFamily: 'Roboto-Medium',
  },
  iconDetail: {
    height: '60%',
    width: '5%',
    aspectRatio: 1,
    justifyContent: 'center',
  },
});

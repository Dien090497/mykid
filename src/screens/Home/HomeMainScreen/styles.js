import Const, {FontSize, ScaleHeight} from '../../../functions/Consts';
import {Platform, StatusBar, StyleSheet} from 'react-native';

import {Colors} from '../../../assets/colors/Colors';

const itemWidth = (Const.windowWidth - 30) / 2;
const searchHeight = Const.screenHeight / 24;
const notifHeight = searchHeight / 1.7;
const itemHeight = Const.screenHeight / 8;
const tabViewHeight = Const.screenHeight;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingTop: 10,
  },
  tabView: {
    flex: 6.5,
    // height: tabViewHeight,
    backgroundColor: Colors.white,
  },
  statusBar: {
    backgroundColor: Colors.red,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 25
  },
  support: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headphone: {
    paddingHorizontal: 10,
  },
  chart: {
    paddingLeft: 10,
    paddingRight: 20,
    borderLeftWidth: 1,
    borderLeftColor: Colors.gray,
  },
  banner: {
    height: ScaleHeight.xxxtraBig,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    height: 20,
  },
  txt: {
    width: '84%',
    marginHorizontal: 5,
  },
  txtTitle: {
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: '400',
    marginTop: -60,
    marginBottom: 0,
    fontFamily: 'UTM Cookies',
    color: Colors.white
  },
  txtNotification: {
    fontSize: 10,
    color: Colors.blueNotification,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  imageRanking: {
    width: searchHeight,
    height: searchHeight,
    alignSelf: 'flex-end',
  },
  buttonContainerL: {width: '50%', minHeight: '19.5%', padding: 5, paddingLeft: 10},
  buttonContainerR: {width: '50%', minHeight: '19.5%', padding: 5, paddingRight: 10},
  button: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayBgBtnHome
  },
  buttonText: {
    fontSize: FontSize.medium,
    color: Colors.black,
    fontFamily: 'Roboto-Regular',
    padding: 5,
  },
  icon: {
    height: 40,
    aspectRatio: 1,
    resizeMode: 'stretch',
  },
  bgIcon: {
    width: 40,
    height: 40,
  },
});

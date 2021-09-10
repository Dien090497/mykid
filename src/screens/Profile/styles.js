import {Platform, StatusBar, StyleSheet} from 'react-native';

import {Colors} from '../../assets/colors/Colors';
import Consts from '../../functions/Consts';

const searchHeight = (Consts.screenHeight / 24);
const followHeight = (Consts.screenHeight /
  (Consts.screenHeight < 800 ? Math.floor(Consts.screenHeight / 80) : Math.floor(
    Consts.screenHeight / 90)));
const settingHeight = (followHeight / 2);
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    width: '95%',
    height: searchHeight,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  titleText: {
    fontSize: 24,
    color: Colors.blue,
    fontFamily: 'Roboto-Medium',
  },
  searchRow: {
    marginLeft: '4.5%',
    width: '72%',
    height: searchHeight,
    backgroundColor: Colors.graySearch,
    borderRadius: 5,
    alignContent: 'center',
    flexDirection: 'row',
  },
  searchInput: {
    width: '90.5%',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 5,
    height: searchHeight,
    alignSelf: 'center',
  },
  icon: {
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  iconProfile:
    {
      width: 24,
      height: 24,
      marginLeft: '6.5%',
    },
  scrollView: {
    flex: 1,
    flexDirection: 'column',
    width: '98%',
    alignContent: 'center',
    marginTop: '1%',
  },
  bgProfile: {
    height: 230,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rowEdit: {
    height: '100%',
    width: '10%',
  },
  columnMainProfile: {
    height: '100%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  }
  ,
  rowProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowProfile1: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLogin: {
    height: 'auto',
    width: '35%',
    backgroundColor: Colors.blueTitle,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.blueTitle,
  },
  buttonRegister: {
    marginLeft: '3%',
    height: 'auto',
    width: '35%',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
  },
  textAnonymous: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    marginTop: '1%',
    marginBottom: '3%',
  },
  guest: {
    alignItems: 'center',
  },
  guestButton: {
    flexDirection: 'row',
  },
  guestText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    marginTop: '1%',
    marginBottom: '3%',
    color: Colors.black,
    fontWeight: 'normal',
  },
  textSlogan: {
    fontSize: 18,
    marginTop: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.sloganOrange,
    fontFamily: 'Roboto-Medium',
  },
  textNickname: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: Colors.black,
  },
  iconGender: {
    height: 'auto',
    width: 15,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginHorizontal: '1%',
  },
  iconCopy: {
    height: 20,
    width: 50,
    resizeMode: 'contain',
    marginHorizontal: '1%',
  },
  rowFollow: {
    height: followHeight,
    flexDirection: 'row',
    width: '100%',
  },
  rowDetailWallet: {
    height: followHeight,
    flexDirection: 'row',
    marginHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    width: '33%',
    height: '100%',
    alignItems: 'center',
  },
  balanceTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  textFollow: {
    fontSize: 16,
    paddingTop: 12,
    fontFamily: 'Roboto-Medium',
  },
  textBalance: {
    fontSize: 16,
    marginLeft: '3%',
    fontFamily: 'Roboto-Medium',
    color: Colors.white,
  },
  iconBalance: {
    width: 30,
    height: 30,
  },
  bgBalance: {
    height: 30,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGold: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
  },
  textRuby: {
    fontSize: 16,
    color: Colors.yellow,
    fontFamily: 'Roboto-Medium',
  },
  columnTitle: {
    flexDirection: 'column',
    width: '25%',
    height: '100%',
    alignItems: 'center',
  },
  iconItem: {
    height: '60%',
    width: 'auto',
    aspectRatio: 1,
  },
  textItem: {
    fontSize: 16,
    paddingTop: 10,
    fontFamily: 'Roboto-Medium',
  },
  rowSettings: {
    marginVertical: '1%',
    paddingTop: '1%',
    height: settingHeight,
    flexDirection: 'row',
    width: '96%',
    borderBottomColor: Colors.graySearch,
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  iconSetting: {
    height: '80%',
    width: '8%',
    aspectRatio: 1,
  },
  textSettings: {
    fontSize: 15,
    width: '80%',
    marginLeft: '5%',
    marginTop: '1%',
    fontFamily: 'Roboto-Medium',
  },
  iconDetail: {
    marginTop: '1.5%',
    height: '60%',
    width: '5%',
    aspectRatio: 1,
    justifyContent: 'center',
  },
  view90: {
    width: '90%',
  },
  viewTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 15,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    width: '100%'
  },
  textContent: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    width: '100%',
    color: Colors.gray
  },
});

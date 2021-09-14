import {Colors} from '../../assets/colors/Colors';
import Consts from '../../functions/Consts';
import {FontSize} from '../../functions/Consts';
import {StyleSheet} from 'react-native';

const searchHeight = Consts.screenHeight / 24;
const bgHeight = Consts.screenHeight / Math.floor(Consts.screenHeight / 200);
const followHeight =
  Consts.screenHeight /
  (Consts.screenHeight < 800
    ? Math.floor(Consts.screenHeight / 80)
    : Math.floor(Consts.screenHeight / 90));
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    width: '95%',
    height: searchHeight,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: '5%'
  },
  titleText: {
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'left',
    color: Colors.black,
    flex: 0.8,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: 'left',
    color: Colors.black,
    flex: 0.8,
    paddingHorizontal: 10,
  },

  iconProfile: {
    width: 'auto',
    height: '75%',
    aspectRatio: 1,
    marginLeft: '1%',
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignContent: 'center',
    marginTop: 10,
    backgroundColor: Colors.grayButton,
  },
  rowItem: {
    backgroundColor: Colors.white,
    height: 'auto',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: Colors.graySearch,
    borderBottomWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  textItem: {
    marginLeft: '4%',
    marginVertical: '4%',
    fontSize: 16,
    width: '86%',
    overflow: 'hidden',
    fontFamily: 'Roboto-Medium',
  },
  iconDetail: {
    height: '100%',
    width: '6%',
    aspectRatio: 1,
    justifyContent: 'center',
  },
  logout: {
    marginTop: '5%',
    backgroundColor: Colors.white,
    height: 'auto',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  textLogout: {
    marginVertical: '3%',
    fontSize: 22,
    fontWeight: 'normal',
    fontFamily: 'Roboto-Medium',
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
    width: '100%',
  },
  textContent: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    width: '100%',
    color: Colors.gray,
  },
  Sty_iconCheckbox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    height: 20,
    width: 20,
    borderColor: '#3CB371',
  },
  Sty_iconCheckbox1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    height: 60,
    width: 60,
    borderColor: '#3CB371',
  },
  containerDevice: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '90%',
    height: 100,
    alignSelf: 'center',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  txtNameDevice: {
    fontSize: FontSize.small,
    color: Colors.lightSalmon,
    fontWeight: '700',
    marginBottom: 4,
  },
  txtLocation: {fontSize: FontSize.small},
  containerLastTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTime: {fontSize: FontSize.small, color: Colors.gray},
  containerBattery: {flexDirection: 'row', alignItems: 'center'},
  icBattery: {
    width: 20,
    height: 16,
    marginLeft: 4,
    tintColor: Colors.greenText,
  },
  icMarker: {width: 30, height: 30, resizeMode: 'contain'},
});

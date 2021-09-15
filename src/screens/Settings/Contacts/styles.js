import Consts, {FontSize} from '../../../functions/Consts';

import {Colors} from '../../../assets/colors/Colors';
import {StyleSheet} from 'react-native';

const searchHeight = Consts.screenHeight / 24;
const screenWidth = Consts.screenWidth
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    width: '95%',
    height: searchHeight,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: '5%'
  },
  titleText: {
    fontSize: FontSize.medium,
    textAlignVertical: 'center',
    textAlign: 'left',
    color: Colors.black,
    flex: 0.8,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: FontSize.small,
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
    paddingVertical: 10,
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
  containerAdd: {
    backgroundColor: Colors.blueButton,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
  },
  txtAdd: {color: 'white', fontSize: FontSize.medium},
  containerSwitch: {flex: 0.2, alignItems: 'center', justifyContent: 'center'},
  containerBottom: {
    padding: 10,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBlockContact: {flex: 0.8, textAlign: 'left', fontSize: FontSize.small},
  containerRemove: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: Colors.grayColorKeyBoard,
    backgroundColor: Colors.grayBackground,
  },
  txtRemove: {fontSize: FontSize.small, color: 'red'},
  containerSelected: {
    backgroundColor: 'red',
    width: FontSize.small,
    height: FontSize.small,
    borderRadius: FontSize.small / 2,
  },
  containerChangeSOS: {
    borderWidth: 1,
    borderColor: Colors.gray,
    width: FontSize.medium,
    height: FontSize.medium,
    borderRadius: FontSize.medium / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSOS: {fontSize: FontSize.xtraSmall, color: 'red'},
  containerSOS: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  wrap: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  containerItemContact: {
    backgroundColor: Colors.grayInput,
    borderRadius: 10,
    marginVertical: 2,
    padding: 15,
    marginHorizontal: 10,
  },
  containerViewBottom: {
    padding: 10,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContact: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    aspectRatio: 1,
  },
  txtEmpty: {
    fontSize: FontSize.small,
    color: Colors.gray,
    marginTop: 10,
    textAlign: 'center'
  },
  containerEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapContainer: {flex: 1}
});

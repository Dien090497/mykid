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
    color: Colors.grayTxt,
    flex: 0.8,
    paddingHorizontal: 10,
    fontFamily:'Roboto-Medium'
  },
  phoneText: {
    fontSize: FontSize.xtraSmall,
    textAlignVertical: 'center',
    textAlign: 'left',
    color: Colors.grayTxt,
    flex: 0.8,
    paddingHorizontal: 10,
    fontFamily: 'Roboto'
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
    backgroundColor: Colors.red,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
  },
  txtAdd: {
    color: 'white',
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Medium'
  },
  containerSwitch: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerBottom: {
    padding: 10,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBlockContact: {
    flex: 0.8,
    textAlign: 'left',
    fontSize: FontSize.small
  },
  containerRemove: {
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: Colors.colorMain,
    backgroundColor: Colors.white,
  },
  txtRemove: {
    fontSize: FontSize.small,
    color: Colors.colorMain,
    fontFamily: 'Roboto-Medium'
  },
  containerSelected: {
    backgroundColor: 'red',
    width: FontSize.small,
    height: FontSize.small,
    borderRadius: FontSize.small / 2,
  },
  containerChangeSOS: {
    borderWidth: 1,
    borderColor: Colors.colorMain,
    width: FontSize.medium,
    height: FontSize.medium,
    borderRadius: FontSize.medium / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSOS: {
    fontSize: FontSize.xtraSmall,
    color: 'red'
  },
  containerSOS: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerItemContact: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    marginHorizontal: 20,
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  containerViewBottom: {
    padding: 10,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:15,
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius:10,
    backgroundColor: Colors.white
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
  wrapContainer: {flex: 1},
});

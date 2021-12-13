import {StyleSheet} from 'react-native';
import { FontSize, ScaleHeight } from '../../functions/Consts';
import {Colors} from '../../assets/colors/Colors';
import {ScreenWidth} from "react-native-elements/dist/helpers";

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.grayBg,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.grayBg,
  },
  viewItem: {
    padding: 10,
    flexDirection: 'row',
    width: '96%',
    alignSelf: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: Colors.white,
  },
  viewArrow: {
    flex: 0.08,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewImg: {
    flex: 0.20,
    justifyContent: 'center',
  },
  viewText: {
    flex: 0.72,
    textAlign: 'left',
    paddingVertical: 15,
  },
  txtDate: {
    position: 'absolute',
    width: '100%',
    textAlign: 'right',
    fontSize: 12,
    right: -15,
    top: -15,
    color: Colors.gray
  },
  txtTitle: {
    fontSize: FontSize.big,
    fontFamily: 'Roboto-Bold',
    color: Colors.grayTextColor
  },
  txtContent: {
    marginTop: 5,
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Light',
    color: Colors.grayTextColor
  },
  icArrow: {
    width: 14,
    height: 14,
    tintColor: Colors.gray,
    resizeMode: 'contain',
    marginLeft: 3,
  },
  icAvatar: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginLeft: 3,
    borderRadius: 25
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3
  },
  menu: {
    alignSelf: 'flex-end',
    width: 'auto',
    marginRight: 10,
    marginVertical: 10
  },
  menuSelect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%'
  },
  iconShowMenu: {
    width: 10,
    height: 10,
    tintColor: Colors.red
  },
  textMenuShow: {
    width: 'auto',
    color: Colors.black,
    fontStyle: 'normal',
    fontSize: FontSize.xtraSmall,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    lineHeight: FontSize.small * 10 / 7,
    marginHorizontal: '4%'
  },
  avatar: {
    width: ScaleHeight.small,
    height: ScaleHeight.small,
    borderRadius: 10000
  },
  textMenuDrop: {
    width: 130,
    marginHorizontal: 5,
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.big,
    color: Colors.black
  },
  viewMenuDrop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  viewModal: {
    flexDirection: 'column',
    width: '90%',
    height: 'auto',
    maxHeight: '60%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textItem: {
    marginLeft: '4%',
    marginVertical: '4%',
    fontSize: FontSize.big,
    width: '86%',
    overflow: 'hidden',
    fontFamily: 'Roboto-bold',
    lineHeight: FontSize.medium * 1.25,
    fontStyle: 'normal'
  },
  containerItemContact: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
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
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon1: {
    width: ScreenWidth * 0.08,
    height: ScreenWidth * 0.08
  },
});

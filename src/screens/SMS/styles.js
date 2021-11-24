import {StyleSheet} from 'react-native';
import { FontSize, ScaleHeight } from '../../functions/Consts';
import {Colors} from '../../assets/colors/Colors';

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
    alignItems: 'center'
  },
  iconShowMenu: {
    width: 10,
    height: 10,
    tintColor: Colors.red
  },
  textMenuShow: {
    width: 150,
    color: Colors.black,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.big,
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
});

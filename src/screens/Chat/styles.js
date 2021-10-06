import {StyleSheet} from 'react-native';
import { FontSize } from '../../functions/Consts';
import {Colors} from '../../assets/colors/Colors';

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
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
  viewTitleRoom: {
    // padding: 10,
    flexDirection: 'row',
    width: '96%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10
    // paddingVertical: 5,
    // borderRadius: 10,
    // marginHorizontal: 5,
    // marginVertical: 5,
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
  txtTitleRoom: {
    fontSize: FontSize.big,
    fontFamily: 'Roboto-Medium',
    color: Colors.grayTextTitleColor
  },
  txtTitle: {
    fontSize: FontSize.big,
    fontFamily: 'Roboto-Bold',
    color: Colors.grayTextColor
  },
  txtContent: {
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
    // tintColor: Colors.gray,
    resizeMode: 'contain',
    marginLeft: 3,
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3
  },
});

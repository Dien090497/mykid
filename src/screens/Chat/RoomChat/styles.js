import {StyleSheet} from 'react-native';
import { FontSize } from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  viewItem: {
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: Colors.white,
  },
  viewBottom: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    height: 70,
    backgroundColor: 'rgba(238, 0, 51, 0.06)',
  },
  viewImg: {
    flex: 0.15,
  },
  viewContent: {
    flex: 0.7,
  },
  viewContentDetail: {
    height: 150,
    borderRadius: 10,
    backgroundColor: Colors.grayBgMsg
  },
  txtTitle: {
    fontSize: FontSize.big,
    fontFamily: 'Roboto-Bold',
    color: Colors.grayTextColor
  },
  icAvatar: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  icKeyboard: {
    marginTop: 12,
    width: 32,
    height: 32,
    alignSelf: 'center',
  },
  icRecord: {
    marginTop: 12,
    width: 40,
    height: 40,
  },
  icCamera: {
    marginTop: 12,
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  toInput: {
    marginTop: 12,
    height: 40,
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center'
  },
  txtInput: {
    fontFamily: 'Roboto-Light',
    fontSize: FontSize.small,
    color: Colors.colorMain,
    textAlign: 'center',
  },
  textInput: {
    fontSize: FontSize.big,
    fontFamily: 'Roboto-Medium',
    color: Colors.colorMain,
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  containerModal: {
    width: "100%",
    height: 100,
    backgroundColor: Colors.opacityMedium,
  },
});

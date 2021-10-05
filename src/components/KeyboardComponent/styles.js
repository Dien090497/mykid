import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/colors/Colors';
import { FontSize } from '../../functions/Consts';

export const styles = StyleSheet.create({
  textInputButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 4,
    marginLeft: 4,
    backgroundColor: Colors.grayColorKeyBoard,
  },
  textInputButtonBlue: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 4,
    marginLeft: 4,
    backgroundColor: Colors.lightBlue,
  },

  icon: {
    height: 18,
    width: 18,
    tintColor: Colors.white,
  },
  footerTextInput: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    fontSize: 12,
    padding: 4,
    textAlign: 'right',
  },
  textInputKeyboard: {
    flex: 4,
    paddingTop: 4,
    marginBottom: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: Colors.gray,
  },
  blueLightTextMention: {
    flex: 1,
    paddingTop: 4,
    marginBottom: 4,
    marginRight: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: Colors.blueLightTextMention,
  },
  keyboardView: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
  },
  lineStyle: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 5,
    height: 0.1,
    borderWidth: 0.5,
    borderColor: Colors.grayKeyBoard,
  },

  viewBottom: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    height: 60,
    backgroundColor: 'rgba(238, 0, 51, 0.06)',
  },
  viewImg: {
    flex: 0.15,
  },
  viewContent: {
    flex: 0.7,
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
});
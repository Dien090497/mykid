import {StyleSheet} from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { FontSize } from '../../functions/Consts';

export const styles = StyleSheet.create({
  containerModal: {
    width: '100%',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.blackTransparent,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    width: '100%'
  },
  content: {
    alignItems: 'center'
  },
  viewTime: {
    alignSelf: 'center',
    marginLeft: '2%',
    backgroundColor: Colors.white,
    width: '60%',
    height: 210,
  },
  viewSub: {
    width: '16%',
    height: 40,
    backgroundColor: Colors.colorMain,
    alignSelf:'center'

  },
  txtSub: {
    fontSize: 60,
    color: Colors.blue
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: Colors.grayInput,
    paddingVertical: 10
  },
  txtCancel: {
    fontSize: FontSize.medium,
    fontFamily: 'Roboto-Medium',
    color: Colors.lightGray,
  },
  txtAccept: {
    fontSize: FontSize.medium,
    fontFamily: 'Roboto-Medium',
    color: Colors.blueButton
  },
  btnCancel: {
    width: '25%',
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  btnAccept: {
    width: '25%',
    alignItems: 'flex-end',
    paddingRight: 10
  }
});

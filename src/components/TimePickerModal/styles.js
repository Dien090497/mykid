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
    marginVertical: 20,
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
    fontSize: FontSize.xxxtraBig * 2.4,
    color: Colors.blue,
    fontFamily: 'Roboto-Medium'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    marginBottom: 20
  },
  txtCancel: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Medium',
    color: Colors.colorMain,
  },
  txtAccept: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Medium',
    color: Colors.white
  },
  btnCancel: {
    width: '40%',
    alignItems: 'center',
    borderColor: Colors.colorMain,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center'
  },
  btnAccept: {
    borderRadius: 10,
    backgroundColor: Colors.colorMain,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

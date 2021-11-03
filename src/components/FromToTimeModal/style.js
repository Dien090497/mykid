import {StyleSheet} from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { FontSize, ScaleHeight } from "../../functions/Consts";

export const styles = StyleSheet.create({
  containerModal: {
    width: '100%',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(1, 1, 1, 0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%',
    alignItems: 'center'
  },
  content: {
    alignItems: 'center'
  },
  viewTime: {
    backgroundColor: Colors.white,
    width: '40%',
    height: 210,
  },
  viewSub: {
    width: '16%',
    height: 40,
    alignSelf:'center',
    alignItems:'center',
    justifyContent: 'center'
  },
  iconSub:{
    width: '30%',
    height: 3,
    backgroundColor: Colors.colorMain,
    borderRadius: 2
  },
  groupBtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: 10
  },
  button: {
    marginBottom: 20,
    height: ScaleHeight.medium,
    backgroundColor: Colors.red,
      width: '40%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: FontSize.xtraSmall,
    fontFamily: 'Roboto-Medium'
  },
  buttonCancel: {
    marginBottom: 20,
    height: ScaleHeight.medium,
    backgroundColor: Colors.white,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.colorMain,
    borderWidth: 1
  },
  buttonTextCancel: {
    color: Colors.colorMain,
    fontSize: FontSize.xtraSmall,
    fontFamily: 'Roboto-Medium'
  },
});

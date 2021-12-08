import {StyleSheet, Dimensions} from 'react-native';
import {FontSize, ScaleHeight} from '../../../../functions/Consts';
import {Colors} from "../../../../assets/colors/Colors";

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  viewContainer: {
    width: '90%',
    height: 45,
    backgroundColor: Colors.white,
    marginTop: 40,
    flexDirection: 'row'
  },
  viewInput: {
    marginTop: 25,
    width: '100%',
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderInputText,
    borderRadius: 10,
    height: ScaleHeight.medium,
  },
  viewTob: {
    position: 'absolute',
    right: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '10%'
  },
  viewImage: {
    width: 25,
    height: 25,
    tintColor: Colors.grayTextTitleColor,
  },
  tobConfirm: {
    backgroundColor: Colors.colorMain,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: ScaleHeight.medium ,
    width:'100%',
    marginTop: ScaleHeight.small * 1.5,
  },
  txt: {
    fontSize: FontSize.small,
    color: Colors.white,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: FontSize.small * 10 / 7
  },
  txtInput: {
    marginLeft: 10,
    color: Colors.black,
    width: '85%',
    fontSize: FontSize.small,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: FontSize.small * 10 / 7
  }
});
export default styles;

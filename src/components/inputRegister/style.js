import {StyleSheet, Dimensions} from 'react-native';
import {FontSize, ScaleHeight} from '../../functions/Consts';
import {Colors} from "../../assets/colors/Colors";

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  Sty_TitleInput: {
    fontSize: 13,
    fontWeight: '700',
  },
  Sty_ViewInput: {
    borderWidth: 1,
    borderColor: Colors.borderInputText,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: ScaleHeight.medium * 1.2,
    width: '100%'
  },
  Sty_input: {
    fontSize: FontSize.xtraSmall,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  txtNotification: {
    padding: 0,
    color: '#D71921',
    fontSize: FontSize.small,
  },
  Sty_iconShow: {
    width: width * 0.07 ,
    height: width * 0.07 ,
    tintColor: Colors.grayTextTitleColor,
  }
});
export default styles;

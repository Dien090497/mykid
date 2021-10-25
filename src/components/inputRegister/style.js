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
    fontSize: FontSize ? FontSize.small : 13,
  },
  txtNotification: {
    padding: 0,
    color: '#D71921',
    fontSize: FontSize ? FontSize.small : 13,
  },
  Sty_iconShow: {
    width: 25,
    height: 25,
    tintColor: Colors.grayTextTitleColor,
  }
});
export default styles;

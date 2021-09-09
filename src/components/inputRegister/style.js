import {StyleSheet, Dimensions} from 'react-native';
import { FontSize } from '../../functions/Consts';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  Sty_TitleInput: {
    fontSize: 13,
    fontWeight: '700',
  },
  Sty_ViewInput: {
    borderBottomWidth: 1,
    borderColor: '#cacaca',
  },
  Sty_input: {
    width: '100%',
    fontSize: FontSize ? FontSize.small : 13,
    padding: 2,
  },
  txtNotification: {
    padding:0,
    color: '#D71921',
    fontSize: FontSize ? FontSize.small : 13,
  },
  Sty_iconShow: {
    width:25,
    height:25
  }
});
export default styles;

import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from "../../assets/colors/Colors";

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  img: {
    height: 21,
    width: 21,
  },
  btn: {
    flex: 1,
    width: '88%',
    flexDirection: 'row',
    height: height * 0.05,
    alignItems: 'center',
  },
  containerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '84%'
  },
  listView: {
    width: '84%',
    height: 'auto',
    borderBottomColor: Colors.colorListRadioGroup,
    borderBottomWidth: 0.5
  },
  textView: {
    color: Colors.black,
    fontSize: 16
  }

});

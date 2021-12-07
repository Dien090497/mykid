import {StyleSheet, Dimensions} from 'react-native';
import {FontSize, ScaleHeight} from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white
  },
  tob: {
    width: 'auto',
    height: ScaleHeight.medium,
    backgroundColor: Colors.redTitle,
    borderRadius: width * 0.02,
    marginTop: height * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    width: width * 0.82,
    height: ScaleHeight.medium,
    color: Colors.black,
    marginHorizontal: width * 0.03,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    fontSize: FontSize.medium
  },
  viewInputText: {
    width: 'auto',
    height: ScaleHeight.medium,
    borderColor: Colors.borderInputText,
    borderRadius: width * 0.02,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: Colors.white,
    fontSize: FontSize.medium,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: FontSize.medium * 1.25
  },
  viewHeader: {
    marginTop: height * 0.05,
    marginHorizontal: width * 0.02,
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewInput: {
    width: 'auto',
    height: '20%',
    marginHorizontal: width * 0.06,
    marginTop: height * 0.02,
    backgroundColor: Colors.white
  }
})

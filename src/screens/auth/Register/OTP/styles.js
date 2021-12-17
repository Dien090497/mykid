import {StyleSheet, Dimensions} from 'react-native';
import {FontSize, ScaleHeight} from '../../../../functions/Consts';
import {Colors} from '../../../../assets/colors/Colors';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  viewContainer: {
    width: '90%',
    height: ScaleHeight.medium,
    backgroundColor: Colors.white,
    marginTop: 40,
    flexDirection: 'row'
  },
  viewInput: {
    width: '80%',
    height: '100%',
    borderColor: 'rgba(231, 231, 231, 1)',
    borderWidth: 0.5,
    borderRadius: 10,
    color: Colors.black,
    justifyContent: 'center'
  },
  textInput: {
    marginHorizontal: 10,
    color: Colors.black,
    fontSize: FontSize.xtraSmall,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
  },
  tob: {
    width: '18%',
    backgroundColor: Colors.redTitle,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: '2%'
  },
  text: {
    fontSize: FontSize.xtraSmall,
    color: Colors.white,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
  },
  viewTxt: {
    width: '18%',
    backgroundColor: 'rgba(228, 228, 228, 1)',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: '2%'
  },
  viewTob: {
    backgroundColor: Colors.colorMain,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    height: ScaleHeight.medium,
    width: width * 0.9,
    marginTop: ScaleHeight.small * 1.5,
  },
  textConfirm: {
    fontSize: FontSize.small,
    color: Colors.white,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
  }
});

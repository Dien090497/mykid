import Consts, {FontSize, ScaleHeight} from '../../../functions/Consts';

import {Colors} from '../../../assets/colors/Colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignContent: 'center',
    backgroundColor: Colors.grayButton,
    paddingVertical: 10,
  },

  iconHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    height: 20,
    width: 20,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: ScaleHeight.big,
    width: ScaleHeight.big,
  },
  itemContainer: {
    backgroundColor: Colors.cardHeader,
    marginBottom: 2,
    marginHorizontal: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLeft: {flex: 1, flexDirection: 'row'},
  // itemRight: {flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue'},
  headerContainer: {
    backgroundColor: Colors.grayInput,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 1,
    // marginTop: 5
  },
  headerText: {padding: 10, fontWeight: 'bold', fontSize: 16},
  button: {
    height: ScaleHeight.medium,
    backgroundColor: Colors.blueButton,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {color: 'white', fontSize: 16},
  smallButton: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.grayColorKeyBoard,
    backgroundColor: Colors.grayInput,
    paddingHorizontal: 20,
    paddingVertical: 3,
  },
  smallButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.small
  },
  info: {justifyContent: 'center', paddingHorizontal: 5, width: '80%'},
  username: {padding: 2, fontWeight: 'bold', fontSize: 16},
  otherInfoText: {padding: 2, fontSize: 16, color: Colors.grayPlaceHolder},
  rowItem: {flexDirection: 'row', marginTop: 8, marginLeft: '5%'},
  rowItem2: {flexDirection: 'row', marginTop: 8, marginLeft: '30%'}
});

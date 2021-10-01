import {StyleSheet} from 'react-native';
import { FontSize, ScaleHeight } from '../../../../functions/Consts';
import {Colors} from '../../../../assets/colors/Colors';

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  iconClock: {
    width: 60,
    height: 60
  },
  viewTime: {
    alignSelf: 'center',
    marginLeft: '2%',
    backgroundColor: Colors.white,
    width: '96%',
    height: 210,
  },
  viewItem: {
    padding: 10,
    flexDirection: 'row',
    width: '96%',
    alignSelf: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: Colors.white,
  },
  viewSwitch: {
    flex: 0.2,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  viewText: {
    flex: 0.8,
    textAlign: 'left',
    paddingVertical: 15,
  },
  txtMode: {
    fontSize: FontSize.medium,
    fontFamily: 'Roboto-Medium',
    color: Colors.black
  },
  icArrow: {
    width: 25,
    height: 25,
    // tintColor: Colors.gray,
    resizeMode: 'contain',
    marginRight: 10,
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3
  },
  txtTitle: {
    width: '96%',
    alignSelf: 'center',
    fontSize: FontSize.medium,
    fontFamily: 'Roboto-Medium',
    color: '#a9a9a9',
    marginTop: 20
  },
  viewMode: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: Colors.white,
  },
  viewDay: {
    backgroundColor: '#d8d8d8',
    width: '12.2%',
    marginHorizontal: '1%',
    aspectRatio: 1,
    justifyContent: 'center',
    borderRadius: 5
  },
  txtDay: {
    alignSelf: 'center',
    fontSize: FontSize.medium,
    fontFamily: 'Roboto-Medium',
    color: Colors.white,
  },
  button: {
    marginTop: 40,
    height: ScaleHeight.medium,
    backgroundColor: Colors.red,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: FontSize.big,
    fontFamily: 'Roboto-Bold'
  },
});

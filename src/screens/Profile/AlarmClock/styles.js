import {StyleSheet} from 'react-native';
import { FontSize } from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

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
  viewImg: {
    width: '96%',
    alignSelf: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'center',
    backgroundColor: '#e4e4e4',
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewText: {
    flex: 0.8,
    textAlign: 'left',
    paddingVertical: 15,
  },
  txtTime: {
    fontSize: FontSize.xtraBig,
    fontFamily: 'Roboto-Bold',
  },
  txtMode: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Light',
  },
  icArrow: {
    width: 14,
    height: 14,
    tintColor: Colors.gray,
    resizeMode: 'contain',
    marginLeft: 3,
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3
  },
});

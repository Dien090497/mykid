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
    backgroundColor: Colors.white,
  },
  iconClock: {
    height: '50%'
  },
  viewImg: {
    width: '100%',
    height:"25%",
    alignSelf: 'center',
    marginVertical: 15,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#e4e4e4',
  },
  viewItem: {
    padding: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0,0,0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
    color: Colors.grayTxt
  },
  txtMode: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto',
    color: Colors.grayTxt
  },
  icArrow: {
    width: 14,
    height: 14,
    tintColor: '#B2B2B0',
    resizeMode: 'contain',
    marginLeft: 15,
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3
  },
});

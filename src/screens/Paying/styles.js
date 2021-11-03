import {Colors} from '../../assets/colors/Colors';
import {StyleSheet} from 'react-native';
import {ScaleHeight} from "../../functions/Consts";

export const styles = StyleSheet.create({
  viewTxt: {
    width: '100%',
    height: ScaleHeight.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  viewItem: {
    backgroundColor: Colors.white,
    marginBottom: 20,
    height: ScaleHeight.medium * 1.2,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  txt_item: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium'
  },
  txt_item1: {
    fontSize: 14,
    fontWeight: '400',
    position: 'absolute',
    right: 10,
    color: Colors.black,
  },
  viewTob: {
    backgroundColor: Colors.redTitle,
    marginVertical: 20,
    height: ScaleHeight.medium * 1.2,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtTob: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '500',
  }
})
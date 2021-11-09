import {Colors} from '../../assets/colors/Colors';
import {StyleSheet, Dimensions} from 'react-native';
import {ScaleHeight} from "../../functions/Consts";

const {height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  body:{
    flex: 1,
    backgroundColor: Colors.white
  },
  viewMain: {
    width: '100%',
    height: height * 0.8,
  },
  viewTxt: {
    width: '100%',
    height: ScaleHeight.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.02
  },
  viewItem: {
    width: '90%',
    backgroundColor: Colors.white,
    marginBottom: height * 0.02,
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
    elevation: 5,
    alignSelf:'center'
  },
  txt_item: {
    fontSize: ScaleHeight.medium * 1.2/3.5,
    color: Colors.grayTextColor,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium'
  },
  txt_item1: {
    fontSize: ScaleHeight.medium * 1.2/4,
    fontWeight: '400',
    position: 'absolute',
    right: 10,
    color: Colors.grayTextColor,
  },
  viewTob: {
    width: '90%',
    alignSelf:'center',
    backgroundColor: Colors.colorMain,
    marginVertical: height * 0.02,
    height: ScaleHeight.medium,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 30
  },
  txtTob: {
    fontSize: ScaleHeight.medium * 1.2/4,
    color: Colors.white,
    fontWeight: '500',
  }
})

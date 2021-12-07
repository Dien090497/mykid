import {StyleSheet, Dimensions} from 'react-native';
import { FontSize, ScaleHeight } from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  radioForm: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: height* 0.02,
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: height* 0.02
  },
  labelStyle: {
    fontSize: FontSize.big,
    color: Colors.colorTextPlus,
    fontWeight: '700',
    fontStyle: 'normal'
  },
  textHeader: {
    fontSize: FontSize.medium,
    fontFamily: 'Roboto',
    color: 'rgba(181, 180, 180, 1)',
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: FontSize.medium * 1.25
  },
   tob: {
       width: '90%',
       height: ScaleHeight.medium,
       borderRadius: 10,
       backgroundColor: Colors.redTitle,
       justifyContent: 'center',
       alignItems: 'center'
   }
});

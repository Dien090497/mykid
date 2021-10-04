import {StyleSheet,Dimensions} from 'react-native';
import Consts from '../../functions/Consts';
const {width,height}=Dimensions.get('window');
export const styles = StyleSheet.create({
  img: {
    height:width*0.05,
    width: width*0.05,
  },
  btn: {
    flex:1,
    width: '88%',
    flexDirection: 'row',
    height:height*0.05,
    alignItems:'center'
  },
});

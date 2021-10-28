import {StyleSheet} from 'react-native';
import { Colors } from '../../../assets/colors/Colors';
import Consts, { FontSize, ScaleHeight } from '../../../functions/Consts';

export const styles = StyleSheet.create({
  containerModal: {
    width: '100%',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.blackTransparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    alignItems:'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    paddingHorizontal:35,
    paddingVertical:10,
    backgroundColor: Colors.white,
    borderRadius:10
  },
  image:{
    height: Consts.windowWidth*0.7,
    width: Consts.windowWidth*0.7,
    backgroundColor: Colors.black
  },
  txtDate:{
    paddingVertical:5,
    fontFamily:'Roboto',
    fontSize: FontSize.xtraSmall,
    color: Colors.grayTextTitleColor
  },
  txtDes:{
    paddingVertical:5,
    fontFamily:'Roboto',
    fontSize: FontSize.small,
    color: Colors.grayTextColor
  },
  groupBtn:{
    borderTopWidth:1,
    borderTopColor:'#E7E7E7',
    width: Consts.windowWidth*0.7,
    flexDirection:'row',
    justifyContent:'space-evenly',
    paddingTop:10
  },
  icTouch:{
    width: ScaleHeight.small,
    height: ScaleHeight.small
  },
  icClose:{
    alignSelf: 'flex-end',
    width: ScaleHeight.xtraSmall,
    height: ScaleHeight.xtraSmall,
  }
});

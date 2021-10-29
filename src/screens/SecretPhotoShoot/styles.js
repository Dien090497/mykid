import { Colors } from "../../assets/colors/Colors";
import { StyleSheet } from "react-native";
import Consts, { FontSize, ScaleHeight } from "../../functions/Consts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  mainView: {
    flex:1,
    alignItems:'center',
  },
  itemList:{
    flex:1,
    marginHorizontal:5,
    alignItems:'center',
    justifyContent:'center',
    maxWidth:(Consts.screenWidth-60)/3,
  },
  imageList:{
    width:Consts.screenWidth*0.3,
    height: Consts.screenWidth*0.3,
    marginVertical:10,
    alignItems:'center',
    justifyContent:'center',
  },
  imageItem:{
    width:'100%',
    height: '100%',
  },
  iconCheck:{
    width:'15%',
    height:'15%',
    position:'absolute',
    top: 5,
    right:5,
  },
  txtItemList:{
    paddingVertical:5,
    fontFamily:'Roboto',
    fontSize: FontSize.xxtraSmall,
    color: Colors.grayTextTitleColor,
    textAlign:'center'
  },
  btnSubmit:{
    backgroundColor:'#EE0033',
    marginVertical:10,
    width:'100%',
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'center',
    height:ScaleHeight.medium,
  },
  textSubmit:{
    color: Colors.white,
    fontFamily:'Roboto-Bold',
    fontSize:14,
  },
  viewTooltip: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

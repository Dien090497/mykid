import {StyleSheet,Dimensions} from 'react-native';
import {FontSize} from "../../../functions/Consts";
import {Colors} from "../../../assets/colors/Colors";
const {width,height}=Dimensions.get('window');
export  const styles =StyleSheet.create({
  viewContainer:{
    flex:1,
    flexDirection:'column',
    backgroundColor:Colors.white
  },
  tob:{
    width:'auto',
    height:height/15,
    backgroundColor:Colors.tobConfirm,
    borderRadius:width*0.02,
    marginTop:height*0.03,
    justifyContent:'center',
    alignItems:'center',
  },
  inputText:{
    width:width*0.82,
    height:height/15,
    color:Colors.black,
    marginHorizontal:width*0.03,
  },
  viewInputText:{
    width:'auto',
    height:height/15,
    borderColor:Colors.borderInputText,
    borderRadius:width*0.02,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    color:Colors.white,
    fontSize:FontSize.xtraBig*0.9
  },
  viewHeader:{
       marginTop:height*0.05,
       marginHorizontal:width*0.02,
       flexDirection:'row',
       alignItems:'center'
  },
  viewInput:{
    width:'auto',
    height:'20%',
    marginHorizontal:width*0.06,
    marginTop:height*0.02,
    backgroundColor:'white'}
})
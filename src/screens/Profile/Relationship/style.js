import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../assets/colors/Colors";
import { FontSize, ScaleHeight } from "../../../functions/Consts";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconSelection:{
    height:ScaleHeight.medium*0.8,
    width:ScaleHeight.medium*0.8,
    marginRight:20
  },
  txtSelection: {
    height:ScaleHeight.medium,
    marginTop: 20,
    marginHorizontal: 30,
    alignItems: "center",
    borderColor:'#E7E7E7',
    borderWidth:1,
    borderRadius: 10,
    flexDirection:"row"
  },
  txtRelationship: {
    color:'#B5B4B4',
    fontSize:FontSize.small,
  },
  modalContainer:{
    flex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.3)',
    alignItems:'center',
    justifyContent:'center'
  },
  modal:{
    width:'80%',
    backgroundColor: Colors.white,
    alignItems:'center',
    borderRadius:10
  },
  titleModal:{
    color: Colors.colorMain,
    marginVertical:20,
    fontFamily:'Roboto-Medium',
    fontSize: FontSize.xtraBig
  },
  textInputModal:{
    width:'80%',
    borderRadius:10,
    borderWidth:1,
    borderColor:'#E7E7E7',
    paddingHorizontal:15,
    height: ScaleHeight.medium,
    color: Colors.black,
  },
  groundBtnModal:{
    flexDirection:'row',
    width:'80%',
    height: ScaleHeight.medium,
    marginVertical:20,
    justifyContent:'space-between'
  },
  btnCancel:{
    borderColor:Colors.colorMain,
    borderWidth:1,
    borderRadius:10,
    height:'100%',
    width:'45%',
    alignItems:'center',
    justifyContent:'center',

  },
  textCancel:{
    color: Colors.colorMain,
    fontFamily:'Roboto-Medium',
    fontSize: FontSize.small
  },
  btnConfirm:{
    backgroundColor:Colors.colorMain,
    borderRadius:10,
    height:'100%',
    width:'45%',
    alignItems:'center',
    justifyContent:'center'
  },
  textConfirm:{
    color: Colors.white,
    fontFamily:'Roboto-Medium',
    fontSize: FontSize.small
  },


  Sty_iconUser: {
    borderRadius: width/6,
    borderWidth:1,
    borderColor: '#00000040',
    height: width/6,
    width: width/6,
  },
  Sty_Item: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height*0.05,
  },
  button: {
    marginTop: 50,
    height: ScaleHeight.medium,
    backgroundColor: Colors.colorMain,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto-Bold'
  },
});
export default styles;

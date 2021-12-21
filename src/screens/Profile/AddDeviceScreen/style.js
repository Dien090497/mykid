import { StyleSheet, Dimensions } from "react-native";
import { FontSize, ScaleHeight } from "../../../functions/Consts";
import { Colors } from "../../../assets/colors/Colors";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  viewImage: {
    alignItems: "center",
    width: "100%",
  },
  Sty_Images: {
    marginVertical: 35,
    height: height * 0.2,
    width: height * 0.2,
  },
  input:{
    width:'100%',
    height: ScaleHeight.medium,
    borderRadius:10,
    borderColor: '#E7E7E7',
    borderWidth:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  iconInput:{
    height:'80%',
    width:ScaleHeight.medium,

  },
  textInput: {
    flex: 1,
    color: Colors.black,
    fontStyle: 'normal',
    fontSize: FontSize.small,
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  modalContainer:{
    flex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.3)',
    alignItems:'center',
    justifyContent:'center'
  },
  modal:{
    width:'85%',
    backgroundColor: Colors.white,
    alignItems:'center',
    borderRadius:10
  },
  titleModal:{
    color: Colors.colorMain,
    marginVertical:20,
    fontFamily:'Roboto-Medium',
    fontSize: FontSize.xtraBig,
    fontWeight: '500'
  },
  contentModal:{
    fontFamily:'Roboto-Medium',
    fontSize: FontSize.xtraSmall,
    color:'#5F5F5F',
    fontWeight: '400'
  },
  btnConfirm:{
    backgroundColor:Colors.colorMain,
    borderRadius:10,
    height:ScaleHeight.medium,
    width:'70%',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:20
  },
  textConfirm:{
    color: Colors.white,
    fontFamily:'Roboto-Medium',
    fontSize: FontSize.small
  },



  Sty_information: {
    marginVertical: 10,
    width: "100%",
  },
  txtInformation: {
    fontSize: FontSize.small,
    color: Colors.colorMain,
    marginTop:20,
    marginBottom: 10,
    fontFamily:'Roboto-Medium'
  },
  Sty_select: {
    backgroundColor: '#DCDCDC40',
    height: height*0.08,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00000040',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 20,
},
  Sty_icon: {
    transform: [{rotate: "90deg"}],
    height: height*0.06/3,
    width: height*0.06/3,
  },
  Sty_iconUser: {
    borderRadius: height*0.07 ,
    borderWidth:1,
    borderColor: '#00000040',
    height: height*0.08/2,
    width: height*0.08/2,
  },
  txtRelationship: {
    marginLeft: 10,
    fontSize: 16,
    color: '#B5B4B4'
  },
  viewButton: {
    backgroundColor: Colors.colorMain,
    height: ScaleHeight.medium,
    width: "100%",
    marginTop: 40,
    justifyContent: "center",
    alignItems:'center',
    borderRadius:10,
    marginBottom:40
  },
  textSubmit:{
    color: Colors.white,
    fontFamily:'Roboto-Medium',
    fontSize: FontSize.small,
    fontStyle: 'normal',
  },
  itemView: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: width* 0.02,
    marginTop: width* 0.04,
    maxWidth: '20%',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50
  },
  textItem: {
    color: Colors.black,
    fontSize: FontSize.medium,
    marginTop: width* 0.01,
    fontFamily: 'Roboto-Medium'
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'column'
  },
  modal1: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    flexDirection:'column'
  },
  tobModal: {
    flexDirection: 'column',
    width: '85%',
    height: '27%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tobView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
  },
  textModel: {
    fontSize: FontSize.medium,
    fontFamily:'Roboto-Medium',
    textAlign: 'center',
    color: Colors.grayTextColor
  },
  TobOpacity: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButton: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.red,
    backgroundColor: Colors.white,
    width: width* 0.3,
    height: height* 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.small
  },
  tob: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default styles;

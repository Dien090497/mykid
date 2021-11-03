import { Colors } from '../../assets/colors/Colors';
import { StyleSheet, Dimensions } from 'react-native';
import { FontSize, ScaleHeight } from "../../functions/Consts";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  body:{
    flex:1,
    backgroundColor: Colors.white
  },
  viewCount:{
    alignItems: 'center',
    paddingVertical:20,
  },
  icon:{
    width: width/3*0.75,
    height: width/3*0.75
  },
  iconMid:{
    width: width/3,
    height: width/3
  },
  txtTop:{
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.big
  },
  subTxtTop:{
    fontFamily: 'Roboto',
    fontSize: FontSize.small
  },
  viewTop:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(240, 240, 240, 0.5)',
    marginTop:15
  },
  button: {
    marginTop: 40,
    marginBottom: 40,
    height: ScaleHeight.medium,
    backgroundColor: Colors.red,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Medium'
  },
});

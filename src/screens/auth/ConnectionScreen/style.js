import { StyleSheet } from "react-native";
import { FontSize,ScaleHeight } from "../../../functions/Consts";
import { Colors } from "../../../assets/colors/Colors";

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width:85,
    height:85,
    marginVertical:50
  },
  btnRegister:{
    width:'100%',
    height: ScaleHeight.medium,
    backgroundColor: Colors.colorMain,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  },
  textRegister:{
    color: Colors.white,
    fontFamily:'Roboto-Medium',
    fontSize: FontSize.small
  },
  txtRegister: {
    marginTop:60,
    color:Colors.colorMain,
    fontSize: FontSize.xxxtraBig,
    fontFamily: "Roboto-Bold",
  }
});
export default styles;

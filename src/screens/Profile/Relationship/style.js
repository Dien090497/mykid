import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../assets/colors/Colors";
import { ScaleHeight } from "../../../functions/Consts";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtSelection: {
    paddingVertical:5,
    marginTop: 10,
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#DCDCDC40',
    borderRadius: 20,
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
    backgroundColor: Colors.blueButton,
    width: '90%',
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

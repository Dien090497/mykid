import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  btnGradient: {
    width: '100%',
    height: height*0.065,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius:height*0.06,
    justifyContent: "center",
    alignItems:"center"
  },
  buttonText: {
    fontSize: height*0.02,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
export default styles;

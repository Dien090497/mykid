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
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
});
export default styles;

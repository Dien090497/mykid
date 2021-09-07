import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({

  btnButton: {
    width: '100%',
    height: height*0.06,
    backgroundColor: '#1E90FF',
    borderRadius:5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
export default styles;

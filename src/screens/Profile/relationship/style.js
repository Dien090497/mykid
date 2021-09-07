import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
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
  Sty_btnView: {
    height: 100,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: height*0.09,
  }
});
export default styles;

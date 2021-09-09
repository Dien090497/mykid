import { StyleSheet, Dimensions } from "react-native";
import { FontSize } from "../../../functions/Consts";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center"
  },
  txtRegister: {
    marginTop: -100,
    marginBottom: 100,
    fontSize: FontSize.xxxtraBig,
    fontFamily: "Roboto-Bold",
  }
});
export default styles;

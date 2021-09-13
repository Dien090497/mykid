import { StyleSheet, Dimensions } from "react-native";
import { FontSize } from "../../functions/Consts";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    // flex:1,
  },
  Sty_TitleInput: {
    marginVertical: 6,
    fontSize: FontSize.medium,
    fontWeight: "700",
    fontFamily: 'Roboto-Medium',
  },
  Sty_ViewInput: {
    marginVertical: 10,
    backgroundColor: "#DCDCDC40",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cacaca",
    paddingHorizontal: 12,
    alignItems: "center",
  },
  Sty_input: {
    height: 48,
    width: "80%",
    fontSize: FontSize.medium,
    fontFamily: 'Roboto-Medium',
  },
  Sty_icon: {
    height: 24,
    width: 24,
    marginRight: 5
  },
  Title: {
    color: "#fff",
    fontSize: FontSize.medium,
    fontFamily: 'Roboto-Medium',
  },
});
export default styles;

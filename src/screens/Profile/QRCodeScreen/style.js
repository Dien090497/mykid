import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 13,
    color: "#FFFFFF",
  },
  buttonTouchable: {
    borderColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },
  noteText: {
    marginBottom: 80,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  bottomView: {
    bottom: 20,
    position: "absolute",
    width: "100%",
    justifyContent: "center",
  },
  bottomContent: {
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});
export default styles;

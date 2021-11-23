import Consts, { FontSize, ScaleHeight } from "../../../../functions/Consts";

import { Colors } from "../../../../assets/colors/Colors";
import { Dimensions, StyleSheet } from "react-native";
import { ScreenHeight } from "react-native-elements/dist/helpers";

const settingHeight = (Consts.screenHeight /
  (Consts.screenHeight < 800 ? Math.floor(Consts.screenHeight / 50) : Math.floor(
    Consts.screenHeight / 70)));
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  viewAvatar: {
    flexDirection: "row",
    height: ScaleHeight.big,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    shadowColor: "rgba(25,25,25, 0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  avatar: {
    width: ScaleHeight.medium,
    height: ScaleHeight.medium,
    borderRadius: ScaleHeight.medium/2,
  },
  containText: {
    color: Colors.colorTextPlus,
    fontSize: FontSize.medium,
    fontFamily: "Roboto-Medium",
  },
  viewContain: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderInputText,
    flexDirection: "row",
    height: ScaleHeight.medium,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  textNickName: {
    color: Colors.grayTextTitleColor,
    fontSize: FontSize.small,
    fontFamily: "Roboto",
  },
  input: {
    width: "100%",
    height: ScaleHeight.medium,
    borderRadius: 10,
    borderColor: "#E7E7E7",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  iconInput: {
    height: "80%",
    width: ScaleHeight.medium,
  },
  button: {
    marginTop: 40,
    height: ScaleHeight.medium,
    backgroundColor: Colors.colorMain,
    width: '100%',
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
  textInput: {
    width: '100%',
    backgroundColor: "#FFF",
    color: Colors.black,
    borderColor: '#E7E7E7',
    fontSize: FontSize.xtraSmall,
  }
});

import {StyleSheet, Dimensions} from 'react-native';
import { FontSize } from '../../../functions/Consts';
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    paddingHorizontal: 20,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Sty_txtEmail: {
    marginLeft: '2%',
    marginTop: 25,
    width: "96%",
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
  },
  Sty_txtPass: {
    marginLeft: '2%',
    width: "98%",
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
  },
  Sty_txtCode: {
    marginLeft: '2%',
    width: "96%",
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
  },
  Sty_iconCode: {
    width: 120,
    height: 27,
  },
  Sty_iconReset: {
    width: 25,
    height: 25,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#009900",
  },
  Sty_iconCheckbox: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    height: 20,
    width: 20,
  },
  txtPolicy: {
    fontWeight: "700",
    fontSize: FontSize.medium,
    color: "#00CCCC",
    textDecorationLine: "underline",
  },
  txt_Policy: {
    fontSize: FontSize.small,
    marginTop: 15,
    marginLeft: -10,
    width: width - 60
  },
  viewButton: {
    width: "96%",
    marginTop: 50,
    justifyContent: "center",
    marginLeft: '2%'
  }
});

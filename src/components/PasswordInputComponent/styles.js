import {StyleSheet} from 'react-native';
import {Colors} from "../../assets/colors/Colors";
import {FontSize} from "../../functions/Consts";


export const styles = StyleSheet.create({
  container: {
    fontSize: FontSize.small,
    color: Colors.black,
    height: 45,
    borderRadius: 22,
    flexDirection: 'row',
    backgroundColor: Colors.bgInput,
    marginBottom: 14,
    paddingHorizontal: 10,
    fontFamily: "Roboto-Regular",
  },
  textInput: {
    flex:1,
  },
  icon: {
    flex:1,
    marginTop: 12,
    alignContent:'center',
    justifyContent: 'center',
  },
});

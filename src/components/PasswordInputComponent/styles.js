import {StyleSheet} from 'react-native';
import {Colors} from "../../assets/colors/Colors";


export const styles = StyleSheet.create({
  container: {
    fontSize: 14,
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

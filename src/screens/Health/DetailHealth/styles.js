import { Colors } from '../../../assets/colors/Colors';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  body:{
    flex:1,
    backgroundColor: Colors.buttonCancel
  }
});

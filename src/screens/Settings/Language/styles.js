import Consts, { FontSize } from "../../../functions/Consts";
import {Colors} from "../../../assets/colors/Colors";
import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    marginTop: 10
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'tomato',
    paddingVertical: 4
  },
  text: {
    fontSize: 18,
    color: '#000',
    paddingVertical: 4
  },
});

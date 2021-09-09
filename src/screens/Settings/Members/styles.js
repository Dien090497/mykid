import { StyleSheet } from 'react-native';
import Consts, { FontSize, ScaleHeight } from "../../../functions/Consts";
import { Colors } from "../../../assets/colors/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignContent: 'center',
    backgroundColor: Colors.grayButton,
    paddingVertical: 10
  },
  
  iconHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    height: 20,
    width: 20,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    height: ScaleHeight.big,
    width: ScaleHeight.big,
  },
  itemContainer: {
    backgroundColor: Colors.cardHeader, 
    marginBottom: 2, 
    marginHorizontal: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLeft: { flex: 0.8, flexDirection: 'row' }, 
  itemRight: {flex:0.2, justifyContent: 'center', alignItems: 'center' }, 
  headerContainer: { borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.cardHeader, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 },
  headerText: { padding: 10, fontWeight: 'bold', fontSize: 16 },
  button: { height: ScaleHeight.medium, backgroundColor: Colors.blueButton, width: '90%', alignSelf: 'center', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16 },
  smallButton: { borderWidth: 1, borderRadius: 20, borderColor: Colors.grayColorKeyBoard, backgroundColor: Colors.grayBackground ,paddingHorizontal: 20, paddingVertical: 5},
  smallButtonText: { fontSize: FontSize.small,},
  info: { justifyContent: 'center', paddingHorizontal: 5 },
  username: { padding: 2, fontWeight: 'bold', fontSize: 16 },
  otherInfoText: { padding: 2, fontSize: 16, color: Colors.grayPlaceHolder }
});
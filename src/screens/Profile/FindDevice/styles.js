import {StyleSheet} from 'react-native';
import Consts, { FontSize, ScaleHeight } from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

const settingHeight = (Consts.screenHeight /
  (Consts.screenHeight < 800 ? Math.floor(Consts.screenHeight / 50) : Math.floor(
    Consts.screenHeight / 70)));
    
export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.whiteDark,
  },
  txtPlus: {
    width: '7%',
    aspectRatio: 1,
    fontSize: FontSize.xxxtraBig,
    fontFamily: 'Roboto-Bold',
    color: Colors.gray
  },
  textPlus: {
    alignSelf: 'center',
    width: '90%',
    fontSize: FontSize.big,
    fontFamily: 'Roboto-Bold',
    color: Colors.gray
  },
  button: {
    marginTop: 40,
    height: ScaleHeight.medium,
    backgroundColor: Colors.blueButton,
    width: '90%',
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
  iconClock: {
    marginLeft: 40,
    marginVertical: 30,
    width: 80,
    height: 80
  }
});

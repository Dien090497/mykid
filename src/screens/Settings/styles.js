import Consts, { FontSize } from "../../functions/Consts";
import {Colors} from "../../assets/colors/Colors";
import {Dimensions, StyleSheet} from 'react-native';

const {width,height} = Dimensions.get('window');
const searchHeight = (Consts.screenHeight / 24);
const bgHeight = (Consts.screenHeight / Math.floor(Consts.screenHeight / 200));
const followHeight = (Consts.screenHeight / (Consts.screenHeight < 800 ? Math.floor(Consts.screenHeight / 80) : Math.floor(Consts.screenHeight / 90)))
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  tobMain: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: width* 0.012,
    marginHorizontal: width* 0.04,
    height: height* 0.08,
    marginVertical: height* 0.01,
    justifyContent: 'center',
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  header: {
    width: '95%',
    height: searchHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: FontSize.medium,
    textAlign: 'left',
    color: 'rgba(95, 95, 95, 1)',
    flex: 0.8,
    paddingHorizontal: 10,
    fontWeight: '500',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: FontSize.medium * 1.25
  },
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignContent: 'center',
    marginTop: width * 0.02
  },
  icon: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width* 0.015
  },
});

import {Colors} from '../../assets/colors/Colors';
import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from "../../functions/Consts";

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
  },
  imgHeart: {
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: height / 3,
    padding: '5%',
  },
  zoneEnd: {
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.medium,
    marginVertical: 10,
    color: '#5F5F5F'
  },
  btn: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconBtn: {
    width: '50%',
    height: '50%',
    padding: height * 0.015,
    resizeMode: 'contain'
  },
  iconHeart: {
    width: '100%',
    height: '100%',
    padding: height * 0.03,
    resizeMode: 'contain'
  },
  textPoint: {
    marginHorizontal: width * 0.08,
    textAlign: 'center',
    fontSize: FontSize.xxxtraBig * 2.5,
    fontFamily: 'Roboto',
    color: '#EE0033',
    maxWidth: '50%'
  },
  btnSubmit: {
    backgroundColor: '#EE0033',
    marginTop: height * 0.03,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.06
  },
  textSubmit: {
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.medium,
  },
  viewPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.01
  }
});

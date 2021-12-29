import {Colors} from '../../assets/colors/Colors';
import Consts from '../../functions/Consts';
import {FontSize} from '../../functions/Consts';
import {StyleSheet} from 'react-native';

const searchHeight = Consts.screenHeight / 24;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  header: {
    width: '95%',
    height: searchHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textMarker: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontFamily: 'Roboto-Bold'
  },
  containerDevice: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  txtNameDevice: {
    fontSize: FontSize.small,
    color: Colors.colorMain,
    fontFamily:'Roboto-Medium',
    marginBottom: 6,
  },
  txtLocation: {
    width: '50%',
    fontSize: FontSize.xxtraSmall,
    fontFamily:'Roboto-Medium',
    color: Colors.grayTxt,
  },
  containerLastTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical:5
  },
  txtTime: {
    fontSize: FontSize.xtraSmall,
    color: Colors.grayTxt,
    textAlign: 'center'
  },
  containerBattery: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icBattery: {
    width: 20,
    height: 16,
    marginLeft: 4,
    tintColor: Colors.greenText,
  },
  icLowBattery: {
    width: 30,
    height: 20,
    marginLeft: 4,
  },
  icMarker: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  avatar: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  containerGetLocation: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 40,
    shadowColor: '#000',
    borderColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 0.2,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

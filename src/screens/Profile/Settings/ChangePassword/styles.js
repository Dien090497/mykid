import {StyleSheet} from 'react-native';
import Consts from '../../../../functions/Consts';
import {Colors} from '../../../../assets/colors/Colors';

const searchHeight = (Consts.screenHeight / 24);
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    width: '95%',
    height: searchHeight,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  guide: {
    width: '100%',
    height: searchHeight * 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: Colors.grayBackground,
  },
  guideText: {
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 20,
    color: Colors.black,
    fontWeight: 'normal',
    width: '90%',
    fontFamily: 'Roboto-Medium',

  },
  mainView: {
    flex: 1,
    backgroundColor: Colors.grayBackground,
    flexDirection: 'column',
    width: '100%',
    alignContent: 'center',
    marginTop: '1%',
  },
  btnDangNhap: {
    height: 50,
    width: '80%',
    borderRadius: 25,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 40,
  },
  txtDangNhap: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Roboto-Regular',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    color: Colors.lightBlue,
    fontWeight: 'bold',
    width: '90%',
  },

  iconProfile:
    {
      width: '100%',
      height: 'auto',
      aspectRatio: 1,
      marginLeft: '1%',
    },
});

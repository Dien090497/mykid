import {StyleSheet, Dimensions} from 'react-native';
import Consts from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

export const styles = StyleSheet.create({
  btnClose: {
    position: 'absolute',
    zIndex: 99,
    top: 35,
    right: 20,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    width: '80%',
    height: 440,
    backgroundColor: Colors.opacityWhite,
    borderRadius: 10,
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 24,
    color: Colors.lightBlack,
    marginTop: 40,
    fontFamily: "Roboto-Bold"
  },
  blockInput: {
    width: '80%',
    marginTop: 40
  },
  txtPhone: {
    fontSize: 14,
    color: Colors.lightGray,
    marginBottom: 13,
    fontFamily: "Roboto-Regular"
  },
  txtInput: {
    fontSize: 14,
    color: Colors.black,
    height: 45,
    borderRadius: 22,
    backgroundColor: Colors.bgInput,
    marginBottom: 14,
    paddingHorizontal: 10,
    fontFamily: "Roboto-Regular",
  },
  btnDangNhap: {
    height: 50,
    width: '100%',
    borderRadius: 25,
    backgroundColor: "#1877F2",
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 30
  },
  txtDangNhap: {
    fontSize: 15,
    color: "white",
    fontFamily: "Roboto-Regular",
  },
  txtQuenMk: {
    fontSize: 14,
    color: Colors.lightBlack,
    fontFamily: "Roboto-Regular",
  },
  btnQuenMk: {
    alignItems: 'center',
    marginTop: 25
  },
  btnDangKy: {
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
  },
  txtDangKy: {
    fontSize: 14,
    color: Colors.lightBlack,
    fontFamily: "Roboto-Bold",
    marginLeft: 10
  },
  blockFbGg: {
    flexDirection: 'row',
    marginTop: 30
  },
  btnGoogle: {
    marginTop:5,
    marginLeft: 15
  },
  btnFacebook: {
    marginTop:5,
    marginRight: 15
  },
  messageError: {
    fontSize: 12,
    color: Colors.red,
    fontFamily: "Roboto-Regular"
  },
});

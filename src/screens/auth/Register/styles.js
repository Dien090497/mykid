import {StyleSheet, Dimensions} from 'react-native';
import Consts from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBack: {
    position: 'absolute',
    zIndex: 99,
    left: 15
  },
  body: {
    width: '80%',
    height: 500,
    backgroundColor: Colors.opacityWhite,
    borderRadius: 10,
    alignItems: 'center',
  },
  MethodRaido: {
    // marginTop: 20,
    width:'80%',
  },
  txtTitle: {
    fontSize: 24,
    color: Colors.lightBlack,
    marginTop: 20,
    fontFamily: "Roboto-Bold",
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  blockInput: {
    width: '80%',
    marginTop: 20,
    flex: 1,
  },
  txtPhone: {
    fontSize: 14,
    color: Colors.lightGray,
    marginBottom: 13,
    fontFamily: "Roboto-Regular",
    marginTop:10
  },
  btnLayMa: {
    height: 25,
    width: '25%',
    borderRadius: 25,
    backgroundColor: "#1877F2",
    justifyContent: "center",
    alignItems: 'center',
    marginRight: 0,
  },
  txtLayMa: {
    fontSize: 12,
    color: "white",
    fontFamily: "Roboto-Regular",
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
  txtStatus: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: "Roboto-Regular",
    alignSelf: 'center',
    marginTop: 12
  },
  otpInput: {
    fontSize: 14,
    color: Colors.black,
    height: 45,
    paddingHorizontal: 10,
    fontFamily: "Roboto-Regular",
    flex: 1
  },
  Otp: {
    height: 50,
    borderRadius: 28,
    backgroundColor: Colors.bgInput,
    marginBottom: 14,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  btnDangNhap: {
    height: 50,
    width: '100%',
    borderRadius: 25,
    backgroundColor: "#1877F2",
    justifyContent: "center",
    alignItems: 'center',
    marginVertical: 30
  },
  txtDangNhap: {
    fontSize: 15,
    color: "white",
    fontFamily: "Roboto-Regular",
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

import {Colors} from '../../assets/colors/Colors';
import {StyleSheet, Dimensions} from 'react-native';
import {FontSize, ScaleHeight} from "../../functions/Consts";

const {width, height} = Dimensions.get("window");

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewCount: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  icon: {
    width: width / 3 * 0.75,
    height: width / 3 * 0.75
  },
  iconMid: {
    width: width / 3,
    height: width / 3
  },
  txtTop: {
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.big
  },
  subTxtTop: {
    fontFamily: 'Roboto',
    fontSize: FontSize.small
  },
  viewTextTop: {
    marginVertical: height * 0.01,
    width: '100%',
    alignItems: 'center'
  },
  textTop: {
    fontSize: FontSize.xxtraSmall,
    color: Colors.colorHeader,
    textAlign: 'center',
    paddingHorizontal: 10
  },
  viewTop: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(240, 240, 240, 0.5)',
  },
  button: {
    marginTop: height * 0.012,
    height: ScaleHeight.medium,
    backgroundColor: Colors.red,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Medium'
  },
  viewItem: {
    padding: 10,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: '1.5%',
    backgroundColor: Colors.white,
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  viewText: {
    marginLeft: 10,
    flex: 1,
    textAlign: 'left',
    paddingVertical: 10,
    height: ScaleHeight.big * 0.9,
    justifyContent: 'center',
    alignContent: 'space-between'
  },
  viewRadio: {
    height: ScaleHeight.big,
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: '-1.5%'
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtAddTime: {
    fontSize: FontSize.big,
    fontFamily: 'Roboto',
    color: Colors.colorHeader
  },
  icArrow: {
    width: 14,
    height: 14,
    tintColor: '#B2B2B0',
    resizeMode: 'contain',
    flex: 1,
  },
  viewSwitch: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  txtTime: {
    fontSize: FontSize.big,
    fontFamily: 'Roboto-Medium',
    color: Colors.grayTxt
  },
});

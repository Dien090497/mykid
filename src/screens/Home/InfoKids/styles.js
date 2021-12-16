import {Colors} from '../../../assets/colors/Colors';
import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from "../../../functions/Consts";

const {width, height} = Dimensions.get("window");

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: height * 0.03
  },
  viewMain: {
    width: '100%',
    height: '24%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tobMain: {
    backgroundColor: Colors.white,
    width: width * 0.9,
    height: height * 0.07,
    marginHorizontal: width * 0.04,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: width * 0.02,
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: height * 0.015,
    marginTop: height * 0.004
  },
  tobViewMain: {
    backgroundColor: Colors.redTitle,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.015,
    width: width * 0.9,
    height: height * 0.06,
    borderRadius: 12
  },
  text: {
    fontSize: FontSize.big * 0.85,
    fontWeight: '500',
    color: Colors.black,
    marginHorizontal: height * 0.007,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
  },
  view: {
    width: height * 0.04,
  },
  image: {
    width: height * 0.04,
    height: height * 0.04
  },
  image1: {
    width: height * 0.05,
    height: height * 0.05,
    resizeMode: 'cover'
  },
  viewImage: {
    flexDirection: 'row',
    position: 'absolute',
    right:  width * 0.02,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageAvatar: {
    width: height * 0.16,
    height: height * 0.16,
    borderRadius: height * 0.08,
    marginTop: height * 0.02
  },
  txtAvatar: {
    marginLeft: '2%',
    fontSize: FontSize.xtraSmall,
    fontFamily: 'Roboto',
    fontWeight: '500',
    lineHeight: FontSize.small  * 10 / 7,
    fontStyle: 'normal'
  },
  txtAction: {
    fontSize: FontSize.big,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400'
  }
});

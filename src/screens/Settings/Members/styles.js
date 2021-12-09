import Consts, {FontSize, ScaleHeight} from '../../../functions/Consts';

import {Colors} from '../../../assets/colors/Colors';
import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
  iconHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.white,
    height: width * 0.07,
    width: width * 0.07,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: 50,
    width: 50,
    resizeMode: 'stretch'
  },
  itemContainer: {
    backgroundColor: Colors.white,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.04,
    padding: 10,
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
    elevation: 5
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'column'
  },
  headerContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: width * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 1,
    borderRadius: width * 0.03,
  },
  headerText: {
    padding: 10,
    fontWeight: 'normal',
    fontSize: FontSize.medium,
    color: Colors.colorHeader,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    lineHeight: FontSize.medium * 1.25
  },
  smallButton: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.red,
    backgroundColor: Colors.white,
    width: width * 0.3,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.small,
    fontStyle: 'normal',
    textAlign: 'center'
  },
  info: {
    justifyContent: 'center',
    paddingHorizontal: 5,
    width: '75%',
    marginLeft: width * 0.02
  },
  username: {
    padding: 2,
    fontWeight: 'bold',
    fontSize: height * 0.025,
    color: Colors.grayTxt,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
  },
  otherInfoText: {
    padding: 2,
    fontSize: height * 0.02,
    color: Colors.grayTxt,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    fontWeight: '400'
  },
  rowItem: {
    flexDirection: 'row',
    marginTop: 8,
    height: ScaleHeight.xxtraBig * 1.5 - ScaleHeight.xxtraBig,
    marginHorizontal: width * 0.06
  },
  rowItem2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '5%'
  },
  containerView: {
    flexDirection: 'row',
    width: '100%',
    height: ScaleHeight.xxtraBig,
    justifyContent: "center",
    alignItems: 'center',
  },
  imageView: {
    height: ScaleHeight.medium * 1.2,
    width: ScaleHeight.medium * 1.2,
    justifyContent: 'center',
    marginTop: -height * 0.04,
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  iconCancel: {
    width: 26,
    height: 26,
    resizeMode: 'stretch'
  },
  tob: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3);',
    width: '100%',
    height: '100%',
    flexDirection: 'column'
  },
  tobModal: {
    flexDirection: 'column',
    width: '85%',
    height: '25%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tobView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
  },
  textModel: {
    fontSize: FontSize.big,
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Roboto'
  },

});

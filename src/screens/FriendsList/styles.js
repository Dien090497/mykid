import {Dimensions, StyleSheet} from 'react-native';
import { FontSize, ScaleHeight } from '../../functions/Consts';
import {Colors} from '../../assets/colors/Colors';
const {width, height} = Dimensions.get("window");
export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.grayBg,
  },
  modal: {
    alignSelf: 'flex-end',
    width: 'auto',
    marginRight: 10,
    marginVertical: 10
  },
  modalSelect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%'
  },
  iconShowModal: {
    width: 10,
    height: 10,
    tintColor: Colors.red
  },
  textModalShow: {
    width: 'auto',
    color: Colors.black,
    fontStyle: 'normal',
    fontSize: FontSize.xtraSmall,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginHorizontal: '4%'
  },
  avatar: {
    width: ScaleHeight.small,
    height: ScaleHeight.small,
    borderRadius: 10000
  },
  viewModal: {
    flexDirection: 'column',
    width: '90%',
    height: 'auto',
    maxHeight: '60%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textItem: {
    marginLeft: '4%',
    marginVertical: '4%',
    fontSize: FontSize.big,
    width: '86%',
    overflow: 'hidden',
    fontFamily: 'Roboto-bold',
    fontStyle: 'normal'
  },
  containerItemContact: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
    marginHorizontal: 20,
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: FontSize.big,
    color: Colors.colorHeader,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    paddingHorizontal: '2%',
    marginBottom: '3%'
  },
  containerView: {
    flexDirection: 'row',
    width: '100%',
    height: ScaleHeight.xxtraBig,
    justifyContent: "center",
    alignItems: 'center',
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
  avatarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: ScaleHeight.medium * 1.2,
    width: ScaleHeight.medium * 1.2,
    borderRadius: ScaleHeight.medium,
    resizeMode: 'cover'
  },
  info: {
    justifyContent: 'center',
    paddingHorizontal: 5,
    width: '75%',
    marginLeft: width * 0.02
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  otherInfoText: {
    padding: 2,
    fontSize: height * 0.02,
    color: Colors.grayTxt,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    fontWeight: '400'
  },
  rowItem2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '5%'
  },
  iconCancel: {
    width: 26,
    height: 26,
    resizeMode: 'stretch'
  },
  tobModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    flexDirection: 'column'
  }
});

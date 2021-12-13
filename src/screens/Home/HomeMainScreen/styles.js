import Const, {FontSize, ScaleHeight} from '../../../functions/Consts';
import {Dimensions, StyleSheet} from 'react-native';

import {Colors} from '../../../assets/colors/Colors';

const {height} = Dimensions.get('window');
const searchHeight = Const.screenHeight / 24;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  tabView: {
    flex: 6.5,
    backgroundColor: Colors.white,
  },
  statusBar: {
    height: ScaleHeight.xxxtraBig,
    backgroundColor: Colors.red,
    borderBottomStartRadius:10,
    borderBottomEndRadius:10,
    alignItems: 'center',
    justifyContent: "center"
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: height * 0.008,
  },
  support: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headphone: {
    paddingHorizontal: 10,
  },
  chart: {
    paddingLeft: 10,
    paddingRight: 20,
    borderLeftWidth: 1,
    borderLeftColor: Colors.gray,
  },
  banner: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    height:'100%'
  },
  menu:{
    position:'absolute',
    bottom:5,
    right:5,
    width:'auto',
  },
  textInput: {
    width: '100%',
    height: 20,
  },
  txt: {
    width: '84%',
    marginHorizontal: 5,
  },
  txtTitle: {
    alignSelf: 'center',
    fontSize: FontSize.xxxtraBig * 1.2,
    fontWeight: '400',
    marginBottom: 0,
    fontFamily: 'UTM Cookies',
    color: Colors.white,
    position: 'absolute',
    fontStyle: 'normal',
    lineHeight: FontSize.xxxtraBig * 1.6
  },
  txtNotification: {
    fontSize: 10,
    color: Colors.blueNotification,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  imageRanking: {
    width: searchHeight,
    height: searchHeight,
    alignSelf: 'flex-end',
  },
  buttonContainerL: {
    width: Const.screenWidth/2,
    padding: '1%',
    paddingLeft: '2%'
  },
  buttonContainerR: {
    width: Const.screenWidth/2,
    padding: '1%',
    paddingRight: '2%'
  },
  buttonContainerL1: {
    width: Const.screenWidth/3,
    padding: '1%',
    paddingLeft: '2%'
  },
  buttonContainer: {
    width: Const.screenWidth/3,
    padding: '1%',
  },
  buttonContainerR1: {
    width: Const.screenWidth/3,
    padding: '1%',
    paddingRight: '2%'
  },
  button: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayBgBtnHome
  },
  buttonText: {
    fontSize: FontSize.small * 0.7,
    color: Colors.black,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    padding: '1%',
    fontStyle: 'normal',
    lineHeight: FontSize.small
  },
  icon: {
    height: height * 0.05,
    aspectRatio: 1,
    resizeMode: 'stretch',
  },
  bgIcon: {
    width: height * 0.05,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01
  },
  menuSelect:{
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems:'center'
  },
  iconShowMenu:{
    width:10,
    height:10
  },
  textMenuShow:{
    width: 'auto',
    color: Colors.white,
    textAlign:"center",
    fontStyle: 'normal',
    fontSize: FontSize.xtraSmall,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    lineHeight: FontSize.small * 10 / 7,
    marginHorizontal: '8%'
  },
  avatar:{
    width:ScaleHeight.small,
    height:ScaleHeight.small,
    borderRadius: 10000
  },
  textMenuDrop:{
    width: 100,
    marginHorizontal:5,
    fontWeight: '400',
    fontSize: FontSize.xtraSmall,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: FontSize.small * 10 / 7
  },
  viewMenuDrop:{
    flexDirection: "row",
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:5
  },
  width50:{
    width: Const.screenWidth/2,
    paddingLeft: '1%',
    paddingTop: '1%',
    flexDirection: 'row'
  }
});

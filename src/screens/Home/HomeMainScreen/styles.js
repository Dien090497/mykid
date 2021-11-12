import Const, {FontSize, ScaleHeight} from '../../../functions/Consts';
import {Platform, StatusBar, StyleSheet} from 'react-native';

import {Colors} from '../../../assets/colors/Colors';

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
    marginVertical: 10,
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
    fontSize: 30,
    fontWeight: '400',
    marginBottom: 0,
    fontFamily: 'UTM Cookies',
    color: Colors.white,
    position: 'absolute',
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
    minHeight: '19.5%',
    padding: 5,
    paddingLeft: 10
  },
  buttonContainerR: {
    width: Const.screenWidth/2,
    minHeight: '19.5%',
    padding: 5,
    paddingRight: 10
  },
  button: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayBgBtnHome
  },
  buttonText: {
    fontSize: FontSize.medium,
    color: Colors.black,
    fontFamily: 'Roboto-Regular',
    padding: 5,
    textAlign: 'center'
  },
  icon: {
    height: 40,
    aspectRatio: 1,
    resizeMode: 'stretch',
  },
  bgIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuSelect:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  iconShowMenu:{
    width:10,
    height:10
  },
  textMenuShow:{
    width:100,
    color: Colors.white,
    textAlign:"center"
  },
  avatar:{
    width:ScaleHeight.small,
    height:ScaleHeight.small,
    borderRadius: 10000
  },
  textMenuDrop:{
    marginHorizontal:5,
    color: '#727272'
  },
  viewMenuDrop:{
    flexDirection: "row",
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:5
  },
  width50:{
    width: Const.screenWidth/2,
  }
});

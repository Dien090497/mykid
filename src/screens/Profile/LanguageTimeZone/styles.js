import {Colors} from '../../../assets/colors/Colors';
import {StyleSheet,Dimensions} from 'react-native';
import Consts, {FontSize, ScaleHeight} from '../../../functions/Consts';
const searchHeight = Consts.screenHeight / 24;
const screenWidth = Consts.screenWidth;
const {width,height} =Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection:'column'
  },
  header: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: FontSize.medium,
    textAlignVertical: 'center',
    textAlign: 'left',
    color: Colors.black,
    flex: 0.8,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: FontSize.small,
    textAlignVertical: 'center',
    textAlign: 'left',
    color: Colors.black,
    flex: 0.8,
    paddingHorizontal: 10,
  },

  iconProfile: {
    width: 'auto',
    height: '75%',
    aspectRatio: 1,
    marginLeft: '1%',
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    width: '86%',
    alignContent: 'center',
    height:height/4.5,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:'7%',
  },
  rowItem: {
    backgroundColor: Colors.white,
    height: 'auto',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: Colors.graySearch,
    borderBottomWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  textItem: {
    marginLeft: '4%',
    marginVertical: '4%',
    fontSize: 16,
    width: '86%',
    overflow: 'hidden',
    fontFamily: 'Roboto-Medium',
  },
  iconDetail: {
    height: '100%',
    width: '6%',
    aspectRatio: 1,
    justifyContent: 'center',
  },
  logout: {
    marginTop: '5%',
    backgroundColor: Colors.white,
    height: 'auto',
    alignItems: 'center',
  },
  textLogout: {
    marginVertical: '3%',
    fontSize: 22,
    fontWeight: 'normal',
    fontFamily: 'Roboto-Medium',
  },
  view90: {
    width: '90%',
  },
  viewTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 15,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    width: '100%',
  },
  textContent: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    width: '100%',
    color: Colors.gray,
  },
  containerAdd :{
    height: ScaleHeight.medium*1.2,
    backgroundColor: Colors.red,
    width:"100%",
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    marginTop:13
  },
  containerAdd1:{
    height: ScaleHeight.medium*1.2,
    backgroundColor: Colors.white,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    marginTop:13,
    borderColor:Colors.red,
    borderWidth:1
  },
  txtAdd: { fontSize: FontSize.medium,fontWeight:'600'},
  containerSwitch: {flex: 0.2, alignItems: 'center', justifyContent: 'center'},
  containerBottom: {
    padding: 10,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBlockContact: {flex: 0.8, textAlign: 'left', fontSize: FontSize.small},
  containerRemove: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: Colors.grayColorKeyBoard,
    backgroundColor: Colors.grayBackground,
  },
  txtRemove: {fontSize: FontSize.small, color: 'red'},
  containerSelected: {
    backgroundColor: 'red',
    width: FontSize.small,
    height: FontSize.small,
    borderRadius: FontSize.small / 2,
  },
  containerChangeSOS: {
    borderWidth: 1,
    borderColor: Colors.gray,
    width: FontSize.medium,
    height: FontSize.medium,
    borderRadius: FontSize.medium / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSOS: {fontSize: FontSize.xtraSmall, color: 'red'},
  containerSOS: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  wrap: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  containerItemContact: {
    backgroundColor: Colors.grayInput,
    borderRadius: 10,
    marginVertical: 2,
    padding: 15,
    marginHorizontal: 10,
  },
  containerViewBottom: {
    padding: 10,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContact: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    aspectRatio: 1,
  },
  txtEmpty: {
    fontSize: FontSize.small,
    color: Colors.gray,
    marginTop: 10,
    textAlign: 'center',
  },
  containerEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapContainer: {flex: 1},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollView: {
    marginBottom: height*0.02,
    marginTop:height*0.02
  },
  view1:{width:'100%',height:height/4.5},
  modalViewTob:{
    width:'100%',
    height:height/1.5,
    backgroundColor:'rgba(1, 1, 1, 0.3)'
  },
  wheelPickkerView:{
    backgroundColor:'white',
    width:'100%',
    height:height-height/1.5,
    flexDirection:'column'},
  confirmView:{
    width:'100%',
    height:height/15,
    backgroundColor:Colors.colorConfirmPicker,
    alignItems:'flex-end',
    justifyContent:'center'
  },
    textConfirm:{
      color:Colors.colorMain,
      fontSize:FontSize.medium,position:'absolute',
      right:width*0.03,
      fontWeight:'600',
      fontStyle:'normal',
  },

});

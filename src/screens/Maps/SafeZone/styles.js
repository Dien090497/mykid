import { Colors } from '../../../assets/colors/Colors';
import { FontSize, ScaleHeight } from '../../../functions/Consts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  mainView: {
    flex: 1,
    backgroundColor: '#EFF0F1',
    flexDirection: 'column',
    width: '100%',
    alignContent: 'center',
  },
  containerDeviceItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  txtName: {
    fontSize: FontSize.small,
    color: Colors.colorMain,
    fontFamily: 'Roboto-Medium',
    flex: 1,
    paddingRight:20
  },
  containerPhone: {
    width: 50,
    aspectRatio: 1
  },
  icPhone: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  txtNotfound: {
    fontSize: FontSize.small,
    textAlign: 'center',
    marginVertical: 10,
    fontStyle: 'italic',
  },
  containerFlatList: {
    marginHorizontal: 4,
    paddingTop: 10
  },
  loadMore: {
    marginVertical: 10
  },
  containerBottomSheet: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  rowDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ScaleHeight.medium,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(173, 173, 173, 0.5)',
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
    marginVertical: 7,
    paddingHorizontal: 15,
  },
  icArrow: {
    width: 14,
    height: 14,
    tintColor: Colors.gray,
    resizeMode: 'contain',
    marginLeft: 3,
  },
  btn: {
    width: '100%',
    backgroundColor: Colors.colorMain,
    height: ScaleHeight.medium,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textBtn: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
  },
  line: {
    marginVertical: 4
  },
  txtNote: {
    fontSize: FontSize.xxtraSmall,
    color: Colors.gray,
  },
  containerTextInput: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  slide: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal:10,
    height: ScaleHeight.big,
    justifyContent:'center'
  },
  textInput: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderColor: Colors.borderInputText,
    borderWidth: 1,
    borderRadius: 10,
    height: ScaleHeight.medium,
    paddingHorizontal:10,
  },
  wrap: {
    flex: 1,
    color:Colors.black
  },
  thumbCircle: {
    width: 20,
    height: 20,
    borderRadius: 40,
    backgroundColor: Colors.colorMain,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  thumb: {
    height: 40,
    width: 40,
    backgroundColor: 'transparent'
  },
  containerAction: {
    height:ScaleHeight.xtraSmall,
    width:ScaleHeight.xtraSmall,
    borderRadius: 40,
    marginHorizontal: 3,
    alignItems:'center',
    backgroundColor:Colors.colorMain
  },
  txtAction: {
    color: 'white',
  },
  containerTextAction: {
    flex: 1,
    alignItems: 'center',
    height: ScaleHeight.medium,
    justifyContent:'center',
    borderRadius:10
  },
  txtSave: {
    color: Colors.white,
    fontFamily:'Roboto-Medium'

  },
  txtBack: {
    color: Colors.red,
    fontFamily:'Roboto-Medium'
  },
  icMarker: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: Colors.colorMain
  },
  containerNote: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txtNoteDrag: {
    textAlign: 'center',
    fontSize: FontSize.small
  },
  containerRadius: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerTitleMarker: {
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 1,
    marginBottom: 3,
  },
  icMarkerDefault: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  txtMarkerName: {
    fontSize: FontSize.small,
  },
  modal:{
    flex:1,
    backgroundColor: Colors.blackTransparent,
    alignItems:'center',
    justifyContent:'center'
  },
  modalContain:{
    backgroundColor: Colors.white,
    paddingBottom:20,
    paddingTop:20,
    paddingHorizontal:20,
    borderRadius:10,
    marginHorizontal:30
  },
  modalTitle:{
    fontFamily:'Roboto-Medium',
    marginBottom:35,
    fontSize: FontSize.small,
    textAlign: 'center'
  }
});

export default styles;

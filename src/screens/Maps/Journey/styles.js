import {Colors} from '../../../assets/colors/Colors';
import {FontSize} from '../../../functions/Consts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'transparent'},
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
    color: Colors.blue,
  },
  txtNotfound: {
    fontSize: FontSize.small,
    textAlign: 'center',
    marginVertical: 10,
    fontStyle: 'italic',
  },
  containerFlatList: {marginHorizontal: 4, paddingTop: 10},
  loadMore: {marginVertical: 10},
  rowDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {marginVertical: 4},
  wrap: {flex: 1},
  containerTime: {
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: Colors.colorMain,
    borderWidth:1
  },
  txtTime: {
    fontSize: FontSize.small,
    color: Colors.colorMain,
    textAlign: 'center',
    fontFamily:'Roboto-Medium'
  },
  txtBtn: {
    fontSize: FontSize.small,
    color: Colors.white,
    textAlign: 'center',
    fontFamily:'Roboto-Medium'
  },
  containerFilter: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent:'space-between'
  },
  icCalendar: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 5
  },
  containerHour: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
  },
  icMarker: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: Colors.yellow
  },
  wrapperFilter: {
    padding:5,
    backgroundColor: Colors.white,
    paddingHorizontal:16
  },
  modal:{
    flex:1,
    backgroundColor: Colors.blackTransparent,
    justifyContent:'center'
  },
  modalContain:{
    backgroundColor: Colors.white,
    marginHorizontal:20,
    paddingHorizontal:40,
    borderRadius:10,
    paddingTop:20
  },
  btnConfirm:{
    backgroundColor: Colors.colorMain,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    flex:1,
    marginLeft:10,
  },
  txtConfirm:{
    color: Colors.white,
    fontSize: FontSize.small,
    textAlign: 'center',
    fontFamily:'Roboto-Medium'
  },
  btnCancel:{
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: Colors.colorMain,
    borderWidth:1,
    flex:1,
    marginRight:10,
  },
  txtCancel:{
    color: Colors.colorMain,
    fontSize: FontSize.small,
    textAlign: 'center',
    fontFamily:'Roboto-Medium'
  }
});

export default styles;

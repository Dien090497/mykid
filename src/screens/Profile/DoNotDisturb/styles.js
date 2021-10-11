import {StyleSheet} from 'react-native';
import Consts ,{ FontSize, ScaleHeight } from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex:1,
    width:'100%'
  },
  iconClock: {
    height: '55%'
  },
  viewImg: {
    width: '100%',
    height: Consts.screenHeight*0.2,
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: '#e4e4e4',
    justifyContent:'center'
  },
  viewItem: {
    padding: 10,
    flexDirection: 'row',
    width: '96%',
    alignSelf: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
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
  viewSwitch: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  viewText: {
    marginLeft:10,
    flex: 1,
    textAlign: 'left',
    paddingVertical: 10,
    height: ScaleHeight.big,
    justifyContent:'center',
    alignContent:'space-between'
  },
  txtTime: {
    fontSize: FontSize.big,
    fontFamily: 'Roboto-Medium',
    color: Colors.grayTxt
  },
  txtAddTime: {
    fontSize: FontSize.big,
    fontFamily: 'Roboto',
    color: Colors.colorHeader
  },
  txtDay: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto',
    color: Colors.grayTxt
  },
  txtMode: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Light',
  },
  icArrow: {
    width: 14,
    height: 14,
    tintColor: '#B2B2B0',
    resizeMode: 'contain',
    marginLeft: 30,
    flex:1,
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 40,
    marginBottom: 40,
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
    fontSize: FontSize.big,
    fontFamily: 'Roboto-Bold'
  },
});

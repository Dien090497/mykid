import {StyleSheet} from 'react-native';
import { FontSize, ScaleHeight } from '../../../../functions/Consts';
import {Colors} from '../../../../assets/colors/Colors';

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    width:'100%'
  },
  iconClock: {
    width: 60,
    height: 60
  },
  viewTime: {
    alignSelf: 'center',
    width: '96%',
    height: 210,
  },
  chooseClock: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 5,
    marginVertical: 15,
    backgroundColor: '#f3f3f3',
    alignItems:'center',
    justifyContent:'center'
  },
  viewItem: {
    height: ScaleHeight.big,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0,0,0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  customView: {
    width: '100%',
    paddingBottom:15,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0,0,0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  viewSwitch: {
    flex: 0.2,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  viewText: {
    flex:1,
    textAlign: 'left',
    justifyContent:'center',
    paddingLeft:15,
  },
  txtMode: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto',
    color: Colors.black
  },
  icArrow: {
    width: 25,
    height: 25,
    // tintColor: Colors.gray,
    resizeMode: 'contain',
    marginRight: 10,
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3
  },
  txtTitle: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto',
    color: '#B5B4B4',
    marginVertical:15
  },
  viewMode: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: Colors.white,
  },
  viewDay: {
    flex:1,
    backgroundColor: '#8E8E93',
    marginHorizontal: '1%',
    aspectRatio: 1,
    justifyContent: 'center',
    borderRadius: 5
  },
  txtDay: {
    alignSelf: 'center',
    fontSize: FontSize.small,
    fontFamily: 'Roboto',
    color: Colors.white,
  },
  button: {
    marginTop: 30,
    height: ScaleHeight.medium,
    backgroundColor: Colors.colorMain,
    width: '100%',
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
});

import {Colors} from '../../../assets/colors/Colors';
import {FontSize} from '../../../functions/Consts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
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
    tintColor: Colors.colorMain
  },
  wrapperFilter: {
    padding:5,
    backgroundColor: Colors.white,
    paddingHorizontal:16
  }
});

export default styles;

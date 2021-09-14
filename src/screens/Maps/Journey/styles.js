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
    backgroundColor: Colors.blueLight,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  txtTime: {
    fontSize: FontSize.small,
    color: Colors.white,
  },
  containerFilter: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  icCalendar: {width: 20, height: 20, resizeMode: 'contain', marginRight: 5},
  containerHour: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
  },
  icMarker: {width: 30, height: 30, resizeMode: 'contain'},
});

export default styles;

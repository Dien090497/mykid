import { Colors } from '../../../assets/colors/Colors';
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
  containerPhone: {width: 50, aspectRatio: 1},
  icPhone: {flex: 1, aspectRatio: 1, resizeMode: 'contain'},
  txtNotfound: {
    fontSize: FontSize.small,
    textAlign: 'center',
    marginVertical: 10,
    fontStyle: 'italic',
  },
  containerFlatList: {marginHorizontal: 4, paddingTop: 10},
  loadMore: {marginVertical: 10},
  containerBottomSheet: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  rowDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icArrow: {
    width: 14,
    height: 14,
    tintColor: Colors.gray,
    resizeMode: 'contain',
    marginLeft: 3,
  },
  line: {marginVertical: 4}
});

export default styles;

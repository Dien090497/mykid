import {Colors} from '../../assets/colors/Colors';
import {FontSize} from '../../functions/Consts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
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
  txtNameDevice: {
    fontSize: 16,
    fontWeight: '800',
  },
  containerPhone: {width: 50, aspectRatio: 1},
  icPhone: {flex: 1, aspectRatio: 1, resizeMode: 'contain'},
  txtNotfound: {
    fontSize: FontSize.small,
    textAlign: 'center',
    marginVertical: 10,
    fontStyle: 'italic',
  },
  containerFlatList: {marginHorizontal: 4, paddingTop: 10}
});

export default styles;

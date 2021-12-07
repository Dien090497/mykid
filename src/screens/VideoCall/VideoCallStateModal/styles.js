import {StyleSheet} from 'react-native';
import {FontSize} from '../../../functions/Consts';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  modalView: {
    flex: 1,
    paddingTop: '20%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  txtName: {
    fontSize: FontSize.xxxtraBig,
    color: 'white',
    fontWeight: '700',
    fontFamily: 'Roboto'
  },
  txtVideoCall: {
    color: 'white',
    fontSize: FontSize.small,
    marginTop: 3,
    fontFamily: 'Roboto-Medium'
  },
  containerFooter: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  containerCancel: {
    width: '20%',
    marginHorizontal: '15%',
    aspectRatio: 1,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  icPhone: {flex: 1, aspectRatio: 1, resizeMode: 'contain'},
});

export default styles;

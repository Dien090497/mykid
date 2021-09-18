import {StyleSheet} from 'react-native';
import {FontSize} from '../../../functions/Consts';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#494954',
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
  },
  txtVideoCall: {
    color: 'white',
    fontSize: FontSize.small,
    marginTop: 3
  },
  containerFooter: {
    height: '20%',
    backgroundColor: '#494954',
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

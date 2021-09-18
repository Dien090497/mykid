import {StyleSheet} from 'react-native';
import {FontSize} from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.transparent,
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
    fontSize: FontSize.medium,
  },
  containerFooter: {
    height: '10%',
    backgroundColor: '#494954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCancel: {
    backgroundColor: Colors.red,
    width: '10%',
    aspectRatio: 1,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  txtCancel: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});

export default styles;

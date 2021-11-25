import {StyleSheet} from 'react-native';
import {FontSize} from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.black,
    position: 'absolute',
  },
  modalView: {
    alignItems: 'center',
    width: '100%',
    height: '15%',
  },
  txtName: {
    marginTop: '10%',
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
    backgroundColor: Colors.blackTransparent,
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

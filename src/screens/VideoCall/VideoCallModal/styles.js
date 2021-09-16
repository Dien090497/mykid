import {StyleSheet} from 'react-native';
import {FontSize} from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#B3B2B3',
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
    height: '15%',
    backgroundColor: '#494954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCancel: {
    backgroundColor: Colors.red,
    width: '15%',
    aspectRatio: 1,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtCancel: {
    fontSize: FontSize.xxxtraBig + 5,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;

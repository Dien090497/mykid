import {StyleSheet} from 'react-native';
import { FontSize, ScaleHeight } from '../../functions/Consts';
import {Colors} from '../../assets/colors/Colors';

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.grayBg,
  },
  modal: {
    alignSelf: 'flex-end',
    width: 'auto',
    marginRight: 10,
    marginVertical: 10
  },
  modalSelect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%'
  },
  iconShowModal: {
    width: 10,
    height: 10,
    tintColor: Colors.red
  },
  textModalShow: {
    width: 'auto',
    color: Colors.black,
    fontStyle: 'normal',
    fontSize: FontSize.xtraSmall,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    lineHeight: FontSize.small * 10 / 7,
    marginHorizontal: '4%'
  },
  avatar: {
    width: ScaleHeight.small,
    height: ScaleHeight.small,
    borderRadius: 10000
  },
  viewModal: {
    flexDirection: 'column',
    width: '90%',
    height: 'auto',
    maxHeight: '60%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textItem: {
    marginLeft: '4%',
    marginVertical: '4%',
    fontSize: FontSize.big,
    width: '86%',
    overflow: 'hidden',
    fontFamily: 'Roboto-bold',
    lineHeight: FontSize.medium * 1.25,
    fontStyle: 'normal'
  },
  containerItemContact: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
    marginHorizontal: 20,
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

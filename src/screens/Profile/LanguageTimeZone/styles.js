import {Colors} from '../../../assets/colors/Colors';
import {StyleSheet, Dimensions} from 'react-native';
import Consts, {FontSize, ScaleHeight} from '../../../functions/Consts';

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection: 'column'
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    width: '86%',
    alignContent: 'center',
    height: height / 4.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '7%',
  },
  containerAdd: {
    height: ScaleHeight.medium * 1.2,
    backgroundColor: Colors.red,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    marginTop: 13
  },
  containerAdd1: {
    height: ScaleHeight.medium * 1.2,
    backgroundColor: Colors.white,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    marginTop: 13,
    borderColor: Colors.red,
    borderWidth: 1
  },
  txtAdd: {
    fontSize: FontSize.medium,
    fontWeight: '600'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Consts.windowWidth
  },
  scrollView: {
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
    height: (Consts.windowHeight * 55) / 100,
    width: Consts.windowWidth
  },
  TobView: {
    width: '100%',
    height: height / 4.5
  },
  modalViewTob: {
    width: '100%',
    height: height / 1.5,
    backgroundColor: 'rgba(1, 1, 1, 0.3)'
  },
  modalView: {
    flex:1,
    flexDirection:'column'
  },
  wheelPickkerView: {
    backgroundColor: 'white',
    width: '100%',
    height: height - height / 1.5,
    flexDirection: 'column'
  },
  confirmView: {
    width: '100%',
    height: height / 15,
    backgroundColor: Colors.colorConfirmPicker,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  textConfirm: {
    color: Colors.colorMain,
    fontSize: FontSize.medium,
    position: 'absolute',
    right: width * 0.03,
    fontWeight: '600',
    fontStyle: 'normal',
  },
  tobWheel: {
    width: '100%',
    height: height - height / 1.5 - height / 4
  },
  wheel: {
    width: '100%',
    height: height / 4
  },
});

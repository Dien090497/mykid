import {FontSize} from '../../functions/Consts';
import {Colors} from '../../assets/colors/Colors';
import {StyleSheet,Dimensions} from 'react-native';
const {width,height} = Dimensions.get("window");

export const styles = StyleSheet.create ({
  itemLeft: {
    flex: 1,
  },
  modal: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
  },
  tobModal: {
    width:'80%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
    padding:5
  },
  viewTitle: {
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
    marginVertical:15
  },
  tobView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:10
  },
  title: {
    fontSize: FontSize.big,
    fontFamily:'Roboto-Medium',
    textAlign: 'center',
    color: Colors.colorMain
  },
  textModel: {
    fontSize: FontSize.xtraSmall,
    fontFamily:'Roboto',
    textAlign: 'center',
    color: Colors.grayTextColor

  },
  smallButton: {
    marginVertical:15,
    borderRadius: 10,
    backgroundColor: Colors.colorMain,
    width: '50%',
    height: height* 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.small,
    color: Colors.white
  },
})

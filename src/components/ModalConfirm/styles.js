import {FontSize} from '../../functions/Consts';
import {Colors} from '../../assets/colors/Colors';
import {StyleSheet,Dimensions} from 'react-native';
const {width,height} = Dimensions.get("window");

export const styles = StyleSheet.create ({
  itemView: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: width* 0.02,
    marginTop: width* 0.04,
    maxWidth: '20%',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50
  },
  textItem: {
    color: Colors.black,
    fontSize: FontSize.medium,
    marginTop: width* 0.01,
    fontFamily: 'Roboto-Medium'
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'column'
  },
  modal: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    flexDirection:'column'
  },
  tobModal: {
    flexDirection: 'column',
    width: '85%',
    height: '27%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tobView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
  },
  textModel: {
    fontSize: FontSize.medium,
    fontFamily:'Roboto-Medium',
    textAlign: 'center',
    color: Colors.grayTextColor
  },
  TobOpacity: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButton: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.red,
    backgroundColor: Colors.white,
    width: width* 0.3,
    height: height* 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.small
  },
  tob: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

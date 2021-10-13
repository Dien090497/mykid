import Consts, {FontSize, ScaleHeight} from '../../../functions/Consts';

import {Colors} from '../../../assets/colors/Colors';
import {StyleSheet,Dimensions} from 'react-native';
const {width,height} = Dimensions.get("window");

export const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  flatListContainer: {
    flexDirection: 'column',
    width: '90%',
    alignContent: 'center',
    paddingVertical: 10,
    height: 'auto',
    alignItems: 'center',
    marginHorizontal: width* 0.02,
    borderRadius: 10,
    marginTop: height* 0.02,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  flatlistView: {
    width: '90%',
    height: 'auto',
    marginHorizontal: width* 0.03 ,
    marginBottom: width* 0.2
  },
  tobDelete: {
    width: '90%',
    height: '7%',
    borderRadius: 10,
    marginTop: height* 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textDelete: {
    textAlign: 'center',
    color: Colors.red,
    fontSize: 14,
    fontWeight: '500'
  },
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
    fontSize: 15,
    marginTop: width* 0.01
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
    height: '25%',
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
    fontSize: 18,
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '500'
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
})
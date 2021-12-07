import Consts, {FontSize, ScaleHeight} from '../../../../functions/Consts';

import {Colors} from '../../../../assets/colors/Colors';
import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignContent: 'center',
    paddingVertical: 10,
  },
  mainContent:{
    flex: 1,
    paddingHorizontal: 20,
    height: ScaleHeight.medium,
    width: '100%',
    alignItems: 'center',
  },
  viewTextInput:{
    flexDirection: 'row',
    height: ScaleHeight.medium ,
    width: '100%',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical:10,
    borderColor: Colors.borderInputText,
    borderWidth:1,
    alignItems:'center'
  },
  textInput:{
    fontSize: FontSize.small,
    padding: 10,
    flex: 1,
    color: Colors.black,
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    fontWeight: '500'
  },
  btnSubmit:{
    backgroundColor: Colors.colorMain,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
    paddingVertical: 13,
  },
  txtSubmit:{
    color: 'white',
    fontSize: FontSize.medium,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    lineHeight: FontSize.medium * 1.25
  },
  iconNodeBook:{
    height: 40,
    width: 40,
    marginRight:5
  },
  imageAvatar: {
    width: height * 0.16,
    height: height * 0.16,
    borderRadius: height * 0.08,
    marginTop: height * 0.02
  },
  icon: {
    height: height * 0.05,
    width: height * 0.05,
    aspectRatio: 1,
    resizeMode: 'stretch',
  },
  txtAvatar: {
    marginLeft: '2%',
    fontSize: FontSize.medium,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: FontSize.medium * 1.25
  },
  txtAction: {
    fontSize: FontSize.big,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400'
  }
});

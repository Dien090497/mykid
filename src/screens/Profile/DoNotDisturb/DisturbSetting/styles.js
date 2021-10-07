import {StyleSheet} from 'react-native';
import Consts ,{ FontSize, ScaleHeight } from '../../../../functions/Consts';
import {Colors} from '../../../../assets/colors/Colors';

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    width:'100%',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height:200,
    alignItems:"center"
  },
  viewTime: {
    flex:1,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: '40%',
    height: 210,
  },
  viewSub: {
    width: 20,
    justifyContent:'center',
  },
  txtSub: {
    height:3,
    backgroundColor: Colors.colorMain,
    borderRadius:3
  },
  customView: {
    marginHorizontal:20,
    paddingBottom:15,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal:15,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0,0,0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleCustom:{
    height: ScaleHeight.medium,
    justifyContent:'center',
  },
  viewDay: {
    flex:1,
    backgroundColor: '#8E8E93',
    marginHorizontal: '1%',
    aspectRatio: 1,
    justifyContent: 'center',
    borderRadius: 5,
    alignItems:"center"
  },
  txtDay: {
    alignSelf: 'center',
    fontSize: FontSize.small,
    fontFamily: 'Roboto',
    color: Colors.white,
  },
  button: {
    marginTop: 40,
    marginBottom: 40,
    height: ScaleHeight.medium,
    backgroundColor: Colors.red,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: FontSize.big,
    fontFamily: 'Roboto-Bold'
  },
});

import { Colors } from '../../assets/colors/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  scroll:{
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainView: {
    flex:1,
    alignItems:'center',
  },
  imgHeart: {
    marginTop:30,
    alignItems:'center',
    justifyContent:'center',
    width: '80%',
    height: 300,
    padding:'5%',
  },
  zoneEnd:{
    borderRadius:150,
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    textAlign:'center',
    fontFamily:'Roboto-Bold',
    fontSize:16,
    marginVertical:10,
    color:'#5F5F5F'
  },
  btn: {
    width:60,
    height:60,
    alignItems:'center',
    justifyContent:'center'
  },
  iconBtn: {
    width:'50%',
    height:'50%',
    padding: 16,
    resizeMode:'contain'
  },
  iconHeart: {
    width:'100%',
    height:'100%',
    padding: 16,
    resizeMode:'contain'
  },
  textPoint: {
    marginHorizontal:30,
    textAlign:'center',
    fontSize:80,
    fontFamily:'Roboto',
    color:'#EE0033'
  },
  btnSubmit:{
    backgroundColor:'#EE0033',
    marginTop:30,
    width:'90%',
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'center',
    height:40
  },
  textSubmit:{
    color: Colors.white,
    fontFamily:'Roboto-Bold',
    fontSize:14,
  }
});

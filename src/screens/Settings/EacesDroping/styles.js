import {StyleSheet,Dimensions} from 'react-native';
const {width,height}= Dimensions.get('window');
export  const styles =StyleSheet.create({
  viewContainer:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'white'
  },
  tob:{
    width:'auto',
    height:height/15,
    backgroundColor: '#EE0033',
    borderRadius:width*0.02,
    marginTop:height*0.03,
    justifyContent:'center',
    alignItems:'center',
  },
  inputText:{
    width:width*0.9,
    height:height/15,
    color:'black'
  },
  viewInputText:{
    width:'auto',
    height:height/15,
    borderColor:'#E7E7E7',
    // backgroundColor:'white',
    borderRadius:width*0.02,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'

  }
})
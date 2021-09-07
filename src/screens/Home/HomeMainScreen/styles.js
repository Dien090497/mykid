import {StyleSheet, Platform, StatusBar} from 'react-native';
import Const from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';
const itemWidth = (Const.windowWidth - 30) / 2;
const searchHeight = (Const.screenHeight/24);
const notifHeight = searchHeight/1.7;
const itemHeight = (Const.screenHeight ) / 10;
const tabViewHeight = Const.screenHeight;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 10,
  },
  tabView: {
    flex: 6.5,
    // height: tabViewHeight,
    backgroundColor: Colors.white
  },
  support: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-end",
  },
  headphone: {
      paddingHorizontal: 10
  },
  chart: {
    paddingLeft: 10,
    paddingRight: 20,
    borderLeftWidth: 1,
    borderLeftColor: Colors.gray
  },
  header: {
    // flex: 3.5,
    height: itemHeight,
    alignContent:'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'space-between'
  },
  textInput: {
    width: '100%',
    height: 20,
  },
  notificationRow: {
    marginVertical: 7.5,
    width: '95%',
    height: notifHeight,
    backgroundColor: Colors.graySearch,
    borderRadius: 5,
    //alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
},
  searchRow: {
    marginTop: 5,
    // marginLeft: 10,
    width: '86%',
    height: searchHeight,
    backgroundColor: Colors.graySearch,
    borderRadius: 5,
    alignContent: 'center',
    flexDirection: 'row'
},
  searchInput: {
    width: '92%',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10 ,
    paddingVertical: 5,
    height: searchHeight,
    alignSelf: 'center'
},
 icon: {
   width: 15,
   height: 15,
   alignSelf: 'center'
},
 txt: {
   width: '84%',
   marginHorizontal: 5,
  },
  txtNotification: {
    fontSize: 10,
    color: Colors.blueNotification,
    fontWeight: 'bold',
    marginBottom: 2
  },
  imageRanking: {
    width: searchHeight,
    height: searchHeight,
    alignSelf: 'flex-end'
  },
  buttonContainer: {width: '50%', minHeight: '20%', padding: 5},
  button: {flex: 1, borderRadius: 10,  justifyContent: 'center', alignItems: 'center'},
  buttonText: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: "Roboto-Regular"
  },
  icon: {
    height:23,
    aspectRatio: 1,
    resizeMode: 'stretch',
  },
  bgIcon: {
    marginLeft: 5,
    width:30,
    height:30,
  },
});

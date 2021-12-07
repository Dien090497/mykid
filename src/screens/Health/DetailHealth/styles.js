import { Colors } from '../../../assets/colors/Colors';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
import { FontSize, ScaleHeight } from "../../../functions/Consts";

export const styles = StyleSheet.create({
  body:{
    backgroundColor: Colors.white,
    flex: 1
  },
  main:{
    alignItems: 'center',
   },
  dateBtn:{
    marginVertical: 15,
    height: ScaleHeight.medium,
    borderWidth:1,
    borderColor: Colors.colorMain,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderRadius: 10
  },
  txtDate:{
    flex:1,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: FontSize.small,
    color: Colors.colorMain
  },
  iconDate:{
    height: ScaleHeight.medium * 0.8,
    width: ScaleHeight.medium * 0.8,
    marginRight:5
  },
  chartView:{
    width:'100%',
    height: height * 0.372,
    backgroundColor: '#fcf7f7'
  },
  headerCharView:{
    width: '100%',
    height: height * 0.052,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10
  },
  iconHeaderChartView:{
    height: width * 0.1,
    width: width * 0.1,
    borderWidth: 1,
    borderColor: Colors.colorMain,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtHeaderChartView:{
    color: '#727272',
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Medium'
  },
  line:{
    width: '90%',
    paddingHorizontal: height * 0.02,
    height: 1,
    backgroundColor: Colors.colorListRadioGroup,
    opacity: 0.2,
    marginTop: height * 0.06
  },
  viewBottom:{
    flexDirection: 'row',
    marginTop: height * 0.02
  },
  viewCount:{
    alignItems: 'center',
    paddingVertical:20,
  },
  icon:{
    width: width/3*0.75,
    height: width/3*0.75
  },
  iconMid:{
    width: width/3,
    height: width/3
  },
  txtTop:{
    fontFamily: 'Roboto-Bold',
    fontSize: FontSize.big
  },
  subTxtTop:{
    fontFamily: 'Roboto',
    fontSize: FontSize.small
  },
});

import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  viewImage: {
    alignItems: "center",
    width: "100%",
  },
  Sty_Images: {
    marginVertical: 20,
    height: height * 0.2,
    width: height * 0.2,
  },
  Sty_information: {
    marginVertical: 10,
    width: "100%",
  },
  txtInformation: {
    marginVertical: 10,
    fontSize: width * 0.045,
    color: "#00000060",
  },
  Sty_select: {
    backgroundColor: '#DCDCDC40',
    height: height*0.08,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00000040',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 20,
},
  Sty_icon: {
    transform: [{rotate: "90deg"}],
    height: height*0.06/3,
    width: height*0.06/3,
  },
  Sty_iconUser: {
    borderRadius: height*0.07 ,
    borderWidth:1,
    borderColor: '#00000040',
    height: height*0.08/2,
    width: height*0.08/2,
  },
  txtRelationship: {
    marginLeft: 10,
    fontSize: 16,
    color: '#00000060'
  }
});
export default styles;

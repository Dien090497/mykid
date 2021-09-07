import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/colors/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    width: '85%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  rowButton: {
    width: '105%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 5,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center'
  },
  textContent: {
    fontSize: 14,
    marginVertical: 10,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center'
  },
  noButton: {
    backgroundColor: Colors.boldPink,
    borderWidth: 1,
    borderColor: Colors.boldPink,
    // marginHorizontal: 7,
    paddingVertical: 7,
    // paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  noButtonText: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  yesButton: {
    backgroundColor: Colors.lightBlue,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    // marginHorizontal: 7,
    paddingVertical: 7,
    // paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  yesButtonText: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});

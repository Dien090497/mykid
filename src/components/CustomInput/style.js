import {StyleSheet, Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        // flex:1,
    },
    Sty_TitleInput: {
        marginVertical: width* 0.02,
        fontSize: 16,
        fontWeight: '700',
    },
    Sty_ViewInput: {
        marginVertical: 10,
        backgroundColor: '#DCDCDC40',
        flexDirection: "row",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#cacaca',
        paddingHorizontal: width * 0.04,
        alignItems: 'center',
    },
    Sty_input: {
        height: height*0.06,
        width: '80%',
        fontSize: 13,
    },
    Sty_icon: {
        height: height*0.06/2,
        width: height*0.06/2,
    },
    Title: {
        color: '#fff',
        fontSize: 16,
    }
});
export default styles;

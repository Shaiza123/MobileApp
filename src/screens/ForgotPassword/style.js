import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        gap: 5,
        paddingHorizontal: '3%',
        paddingVertical:'8%'
    },
    textInput: {
        width: '70%',
        padding: wp(2),
        borderWidth: hp(0.2),
        borderRadius: hp(1),
        borderColor: "#95B6FF",
        margin: hp(1)
    },
    signUpButton: {
        width: '20%',
        borderWidth: hp(0.2),
        borderRadius: hp(1),
        borderColor: "#95B6FF",
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp(2),
        margin: hp(2)
    },
    textDirection: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    forgotPassword: {
        fontSize: RFPercentage(3),
        fontWeight: 'bold',
        marginBottom: hp(2)
    },
    forgotPasswordText: {
        fontSize: RFPercentage(2),
        marginBottom: hp(2),
        width: '80%',
    },
    textStyling: {
        marginRight: hp(0.5)
    },
    errors: {
        fontSize: RFPercentage(1.5),
        color: 'red',
        fontWeight: 'bold',
        marginTop: hp(0.5),
        width: '70%'
    },
})
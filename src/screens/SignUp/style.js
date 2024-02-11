import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize"; 

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        // paddingBottom: hp(5),
        gap: 20,
        paddingHorizontal: '3%',
        paddingVertical:'8%'
    },
    signUpButton: {
        width: '20%',
        borderWidth: hp(0.2),
        borderRadius: hp(1),
        borderColor: '#95B6FF',
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
    textStyling: {
        marginRight: hp(0.5)
    },
    loginTextStyling: {
        color: '#0147AB',
        textDecorationLine: 'underline'
    },
    errors: {
        fontSize: RFPercentage(1.5),
        color: 'red',
        fontWeight: 'bold',
        marginTop: hp(0.5),
        width: '70%'
    },
})
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

export default styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#ffffff",
        // paddingBottom: hp(5),
        gap: 20,
        paddingHorizontal: '3%',
        paddingVertical:'8%'
        
    },
    resendButton: {
        width: '30%',
        borderWidth: hp(0.2),
        borderRadius: hp(1),
        borderColor: '#95B6FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp(2),
        margin: hp(2)
    },
    signUpText: {
        fontSize: RFPercentage(2.5),
        color:'#000',
        fontWeight: 'normal',
        marginBottom: hp(2)
    },
    emailText: {
        fontSize: RFPercentage(2),
        marginBottom: hp(2),
        color:'blue'
    },
    textDirection:{
        flexDirection:'column'
    },
    userVerifiedText:{
        fontSize: RFPercentage(5),
        fontWeight: 'bold',
        marginTop: hp(4)
    }
})
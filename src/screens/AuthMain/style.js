import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

export default styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        gap:10,
        paddingBottom: hp(5)
    },
    input: {
        width: '70%',
        padding: wp(2),
        borderWidth: hp(0.2),
        borderRadius: hp(1),
        borderColor: 'black',
        margin: hp(1),
        borderColor: '#95B6FF'
    },
    login: {
        width: '20%',
        borderWidth: hp(0.2),
        borderRadius: hp(1),
        borderColor: '#95B6FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp(2),
        margin: hp(2)
    },
    forgotPassword: {
        marginTop: wp(0.2),
        marginBottom: wp(2.5),
        marginLeft: wp(50),
        color: "#95B6FF"
    },
    errors: {
        fontSize: RFPercentage(1.5),
        color: 'red',
        fontWeight: 'bold',
        marginTop: hp(0.5),
        width: '70%'
    },
    forgotPassword: {
        marginTop: hp('5%'),
        fontSize: hp(1.5),
        color: '#5dcfb6',
        textAlign: 'right',
        marginRight: '5%',
        textDecorationLine: 'underline'
      },
      lineContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      line: {
        width: '20%',
        height: 1,
        borderBottomWidth: 1,
        borderColor: '#707070',
        marginHorizontal: '1%',
      },
      buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        width: '100%',
      },
      buttonText: {
        fontSize: RFPercentage(2),
        // color: '#000',
        fontWeight:'normal'
      },
      heading:{
        fontSize: RFPercentage(4),
        color: '#000',
        fontWeight:'bold'
      }
})
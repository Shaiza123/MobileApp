import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

export default styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',   
    },
    button: {
        width: '100%',
        borderRadius: wp('10%'),
      },
      buttonText: {
        fontSize: RFPercentage(2),
        fontWeight:'normal'
      },
});
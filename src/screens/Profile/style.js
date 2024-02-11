import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

export default styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  buttonContainer: {
    marginVertical: hp(4),
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: '90%',
    borderRadius: wp('2%'),
    marginBottom  : hp(2),
    borderWidth: 1,
  },
  buttonText: {
    fontSize: RFPercentage(2),
    color: '#fff',
  }

})
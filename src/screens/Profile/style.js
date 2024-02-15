import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

export default styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 2,
    paddingHorizontal: '3%',
    paddingVertical: '8%'
  },
  buttonContainer: {
    marginVertical: hp(4),
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: '90%',
    borderRadius: wp('2%'),
    marginBottom: hp(2),
    borderWidth: 1,
  },
  buttonText: {
    fontSize: RFPercentage(2),
    color: '#fff',
  },
  drawerImage: {
    height: hp(15),
    width: hp(15),
  },
  cameraContainer: {
    flex:1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: hp(20),
    justifyContent:'center',
    alignItems:'center'
  },

})
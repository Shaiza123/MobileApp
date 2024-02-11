import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 2,
    paddingHorizontal: '3%',
  },
  allDataContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    height: hp(20),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(2)
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(2)
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: hp(2),
  },
  textHeading: {
    fontWeight: '700',
    fontSize: RFPercentage(2.5),
    color: '#000'
  },
  plusIcon: {
    fontSize: RFPercentage(5),
    color: "white"
  },
  plusIconStyling: {
    width: "20%",
    backgroundColor: "#5dcfb6",
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: "4%",
    bottom: "2%",
    zIndex: 1,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5
  },
  deleteIcon: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: '40%',
    backgroundColor: '#fff'
  },
  buttonText: {
    fontSize: RFPercentage(1.8),
    fontWeight: 'normal',
  },
  lottie: {
    width: hp(35),
    height:hp(17)
  },
});
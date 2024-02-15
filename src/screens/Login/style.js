import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

export default styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    gap: 5,
    paddingHorizontal: '3%',
    paddingVertical:'8%'
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
  errors: {
    fontSize: RFPercentage(1.5),
    color: 'red',
    fontWeight: 'bold',
    marginTop: hp(0.5),
    width: '70%'
  },
  forgotPassword: {
    marginTop:hp(2),
    fontSize: hp(2),
    color: '#0147AB',
    textAlign: 'center',
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
    width: '90%',
    borderRadius: wp('2%'),
  },
  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight:'normal'
  },
})
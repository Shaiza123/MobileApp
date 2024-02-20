import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      gap: 2,
      paddingHorizontal: '3%',
      paddingBottom:'20%',
    },
    image:{
      width:wp(35),
      height:hp(20),
      alignSelf:'center'
    }
  });
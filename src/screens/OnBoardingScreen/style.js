import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize"; 

export default styles = StyleSheet.create({
   title:{
    fontSize:RFPercentage(3.5),
    fontWeight:'bold'
   },
   imageContainerStyles:{
    paddingBottom:hp(0.5)
   },
   button:{
      marginHorizontal: wp(5),
      backgroundColor:'#0147AB',
      paddingHorizontal:wp(8), 
      paddingVertical:wp(3),
      borderRadius:wp(6)
   }
})
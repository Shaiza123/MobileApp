import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  heading: {
    color: '#000',
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
  },
  headingText:{
    color: '#000', 
    fontSize: RFPercentage(3), 
    fontWeight: 'bold', 
  },
  image:{
    width:wp(20),
    height:hp(6),
  }

});
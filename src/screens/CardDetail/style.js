import { StyleSheet,Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        gap: 2,
      },
      postContainer:{
        padding:hp(2),
        borderBottomWidth:1,
        borderBottomColor:'#CCCCCC'
      },
      titleContainer: {
        height:hp(40),
        justifyContent: 'center',
        alignItems: 'center',
      },
      postTitleText: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: RFPercentage(2),
        width:'80%'
      },
      heading:{
        color:'#000',
        fontSize:RFPercentage(2),
        fontWeight:'700'
      }
})
import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp ,widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    inputContainer:{
        alignItems:'center',
    },
    input: {     
        width:'100%',
        backgroundColor:'transparent',
        fontSize:RFPercentage(1.5),
    },
    text:{
        fontSize:RFPercentage(1.5),
        color:'#000',
        marginVertical: '1%',
        fontWeight:'bold'
    },
    errors: {
        fontSize: RFPercentage(1.5),
        color: 'red',
        fontWeight: 'bold',
        marginTop: hp(0.5),
        width: '70%'
    },
    imageName:{
        paddingVertical:wp(1.5),
        paddingHorizontal:hp(1)
    },
    button:{
        marginTop:hp(1),
        borderRadius:hp(1.5),
        backgroundColor:'lightgrey',
        flexDirection:'row',
        justifyContent:'space-between'
    }
    
  });
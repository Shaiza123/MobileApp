import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

export default styles = StyleSheet.create({
    container: {
        flex: 1,   
    },
    drawerBackground: {
        padding: hp(3),
    },
    drawerImage:{
        height: hp(10),
        width: hp(10),
        borderRadius: hp(5),
        marginBottom: hp(1)
    },
    userEmail:{
        color:'#fff',
        fontSize: RFPercentage(2),
    },
    drawerList:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop: hp(2),
    },
    bottomDiv:{
        padding: hp(2),
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    bottomDivButton:{
        paddingVertical: hp(1),
    },
    bottomDivText:{
        fontSize: RFPercentage(2),
        marginLeft: hp(1.5),
        color:'#000'
    }

});
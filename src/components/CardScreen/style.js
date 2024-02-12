import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    card: {
        height: hp(26.5),
        width: hp(20),
        marginHorizontal: hp(1),
        backgroundColor: "#fff",
    },
    categoryPrice: {
        fontSize: RFPercentage(1.8),
        color: '#4CAF50',
        fontWeight: '500',
    },
    image:{
        width: hp(20),
        height: hp(20),    
    },
    cardImage: {
        height: '100%',
        width: '100%', 
    },
   
    cardTitle: {
        fontSize: RFPercentage(1.8),
        color: '#000',
        fontWeight: '700',
    },
    unit:{
        color: '#000',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: hp(1),
    },
    iconContainer:{
        ...StyleSheet.absoluteFill,
        alignItems:'flex-end',
    },
    bookmarkIcon:{
        backgroundColor:'#0147AB',
        paddingHorizontal:hp(1.8),
        paddingVertical:hp(1.5),
        borderRadius:hp(5),
        margin:hp(1)
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: hp(2)
    },
    menuItemText: {
        marginLeft: hp(1),
        fontSize: RFPercentage(2),
    },
    menuTriggerStyle: {
        padding: hp(1)
    },

});
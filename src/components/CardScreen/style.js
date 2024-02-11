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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        position: 'absolute',
        top: hp(10),
        right: hp(1),
        backgroundColor: '#F9F6F7',
        borderRadius: hp(1),
        paddingVertical: hp(4),
        paddingHorizontal: hp(7),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '10%',
        justifyContent:'center'
    },
    deleteButton: {
        position: 'absolute',
        flexDirection: 'row',
    },
    deleteText: {
        color: '#FF0000',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: hp(2),
    },

    deleteText: {
        color: '#FF0000',
        marginLeft: hp(2),
    },

});
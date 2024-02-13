import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        height: hp(45),
        backgroundColor: '#F9F6F7',
        borderRadius: hp(2),
        padding: hp(8),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    closeButton: {
        position: 'absolute',
        bottom: hp(3),
        right: hp(5),
    },
    modalText: {
        textAlign: 'center',
        fontSize: RFPercentage(2.5),
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        color:'#000'
    },
    lottie: {
        flex: 1,
        width: hp(30),
    },
    okText: {
        color: '#0147AB',
    }

});

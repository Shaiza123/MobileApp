import { StyleSheet} from 'react-native'
import { heightPercentageToDP as hp ,widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

export default styles = StyleSheet.create({
    listView: {
        flexDirection: "row",
        backgroundColor: '#f48fb0',
        width: wp(90),
        height: hp(15),
        borderRadius: hp(3),
        padding: wp(3),
        alignItems: "center",
        marginBottom: hp(2),
    },
    imageContainer: {
        width: wp(25),
        height: hp(10),
        marginRight: wp(2),
        borderRadius: hp(1)
    },
    imageloading: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    iconContainer: {
        width: wp(8),
        height: hp(4.3),
        marginTop: hp(5),
        borderRadius: hp(1),
        justifyContent: "center",
        alignItems: "center"

    },
    dataContainer: {
        width: wp(50),
        height: hp(10),
    },
    deleteLoading: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        width: wp(90),
        height: hp(15),
        borderRadius: hp(3),
      },
      image: {
        width: "100%",
        height: "100%"
      },
      listText: {
        fontSize: RFPercentage(2),
        color: 'white',
      },
     
})
import React from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import { heightPercentageToDP as hp ,widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from '../../components/ListView/style'

const ListView = (props) => {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.8}
            >
                <View style={styles.listView}>
                    <View style={styles.dataContainer}>
                        <Text style={styles.listText}>{props?.item?.PostTitle}</Text>
                        <Text style={styles.listText}>{props?.item?.PostDescription}</Text>
                    </View>
                    {props?.item?.isLoading ? <></> :
                        <View style={styles.iconContainer}>
                            <TouchableOpacity style={styles.deleteIcon} onPress={() => props?.deleteCollection(props?.item?.id, props?.item?.Post)}>
                                <Icon name="delete" size={hp(3.7)} color={"#5dcfb6"} />
                            </TouchableOpacity>
                        </View>}
                </View>
                {props?.deletingItemId === props?.item?.id && props?.isDeleting && (
                    <View
                        style={styles.deleteLoading}
                    >
                        <ActivityIndicator color="white" size="large" />
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}
export default ListView


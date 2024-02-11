import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import styles from '../CardScreen/style';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button, Menu, Divider } from 'react-native-paper';

const CardScreen = (props) => {
    const onMenuItemSelected = (value) => {
        if (value === 'delete') {
            props?.deleteArticle();
        }
    };

    return (
        <Card style={styles.card} mode='contained' onPress={() => props?.navigation.navigate('CardDetail', { item: props?.item })} >
            <View style={styles.image}>
                <Card.Cover source={{ uri: props?.item?.image }} style={styles.cardImage} />
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => props?.bookmarkArticle(props?.item?.id, props?.item?.PostTitle, props?.item?.PostDescription, props?.item?.image, props?.item?.bookmark)}>
                        {props?.isBookmarked || props?.item?.bookmark ? <FontAwesome name="bookmark" size={hp(2.3)} color="#fff" style={styles.bookmarkIcon} /> :
                            <FontAwesome name="bookmark-o" size={hp(2.3)} color="#fff" style={styles.bookmarkIcon} />}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle} numberOfLines={2}>{props?.item?.PostTitle}</Text>
                <Menu
                    contentStyle={{ backgroundColor: '#fff' }}
                    visible={props?.visibleMenu}
                    onDismiss={props?.closeMenu}
                    anchor={<Button onPress={() => props?.openMenu(props?.item?.id)} icon={() => <Entypo name='dots-three-vertical' size={hp(2)} color='#000' />} />} >
                    {props?.visible === props?.item?.id &&
                        <>
                            <Menu.Item onPress={() => { }} title="Delete" titleStyle={{color:'#ff0000'}} trailingIcon='delete' />
                        </>
                    }
                </Menu>
            </View>
        </Card>
    )
}

export default CardScreen
import { View, Text, ActivityIndicator } from 'react-native'
import React,{useCallback,useState} from 'react'
import styles from '../CardScreen/style';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useFocusEffect } from '@react-navigation/native';


const CardScreen = (props) => {
    // console.log(props?.isBookmarked)
  const [isBookmarked, setIsBookmarked] = useState(props?.isBookmarked);
  useFocusEffect(
      useCallback(() => {
          setIsBookmarked(props?.isBookmarked);
        return () => {}; 
                         
      }, [props?.isBookmarked]));
return (
    <Card style={styles.card} mode='contained' onPress={() => props?.navigation.navigate('CardDetail', { item: props?.item, isOwner: props?.isOwner,isBookmarked:isBookmarked, deleteCollection: props?.deleteCollection, bookmarkArticle: props?.bookmarkArticle })} >
        {(props?.loading && props.isSaving) || (props?.isDeleting && props?.deleteItemId === props?.item?.id) ? <ActivityIndicator color="black" size="large" /> :
            <>
                <View style={styles.image}>
                    <Card.Cover source={{ uri: props?.item?.image }} style={styles.cardImage} />
                    <View style={styles.iconContainer}>
                            {props?.isBookmarked ? <FontAwesome name="bookmark" size={hp(2.3)} color="#fff" style={styles.bookmarkIcon} /> :
                                <FontAwesome name="bookmark-o" size={hp(2.3)} color="#fff" style={styles.bookmarkIcon} />}
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <Text style={styles.cardTitle} numberOfLines={2}>{props?.item?.PostTitle}</Text>
                    <Menu>
                        <MenuTrigger>
                            <View style={styles.menuTriggerStyle}>
                                <Entypo name='dots-three-vertical' size={hp(2)} color='#000' />
                            </View>
                        </MenuTrigger>
                        <MenuOptions>
                            {props?.isOwner && (
                                <>
                                    <MenuOption onSelect={() => props?.deleteCollection(props?.item?.id, props?.item?.PostTitle)}>
                                        <View style={styles.menuItem}>
                                            <FontAwesome name="trash" size={20} color="#FF0000" />
                                            <Text style={[styles.menuItemText, { color: '#FF0000' }]}>Delete</Text>
                                        </View>
                                    </MenuOption>
                                    <MenuOption onSelect={() => props?.bookmarkArticle(props?.item?.id, props?.item?.PostTitle, props?.item?.PostDescription, props?.item?.image)}>
                                        <View style={styles.menuItem}>
                                            <FontAwesome name={props?.isBookmarked ? "bookmark" : "bookmark-o"} size={20} color="#0147AB" />
                                            <Text style={[styles.menuItemText, { color: '#0147AB' }]}>{props?.isBookmarked ? 'UnBookmark' : 'Bookmark'}</Text>
                                        </View>
                                    </MenuOption>
                                </>
                            )}
                            {!props?.isOwner && (
                                <MenuOption onSelect={() => props?.bookmarkArticle(props?.item?.id, props?.item?.PostTitle, props?.item?.PostDescription, props?.item?.image)}>
                                    <View style={styles.menuItem}>
                                        <FontAwesome name={props?.isBookmarked ? "bookmark" : "bookmark-o"} size={20} color="#0147AB" />
                                        <Text style={[styles.menuItemText, { color: '#0147AB' }]}>{props?.isBookmarked ? 'UnBookmark' : 'Bookmark'}</Text>
                                    </View>
                                </MenuOption>
                            )}
                        </MenuOptions>
                    </Menu>
                </View>
            </>
        }
    </Card>
)
}

export default CardScreen
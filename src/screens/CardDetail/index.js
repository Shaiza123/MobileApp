import React, { useCallback, useState } from 'react'
import { Text, View, Image, Platform } from 'react-native'
import styles from '../CardDetail/style'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackButton from '../../components/BackButton/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo'
import { useFocusEffect } from '@react-navigation/native';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 300;

const CardDetail = (props) => {
  const itemData = props?.route?.params?.item
  const headerImage = itemData?.image ? { uri: itemData.image } : require('../../assets/img2.png');
  const [isBookmarked, setIsBookmarked] = useState(props?.route?.params?.isBookmarked);

  useFocusEffect(
    useCallback(() => {
      setIsBookmarked(props?.route?.params?.isBookmarked);
      return () => { };
    }, [props?.navigation, props?.route?.params?.isBookmarked]))
  return (
    <>
      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (<Image source={headerImage} style={{ width: '100%', height: MAX_HEIGHT }} />)}
        renderForeground={() => (
          <>
            <BackButton navigation={props?.navigation} children={'Detail Screen'} />
            <View style={styles.titleContainer}>
              <Text style={styles.postTitleText}>
                {itemData?.PostTitle}
              </Text>
            </View>
          </>
        )}
      >
        <TriggeringView style={{ marginHorizontal: hp(1) }}
        >
          <View style={styles.postContainer}>
            <Text style={styles.heading}>OverView</Text>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome
                name={isBookmarked ? "bookmark" : "bookmark-o"}
                size={hp(3)} color="#0147AB" />
              <Menu>
                <MenuTrigger>
                  <View style={styles.menuTriggerStyle}>
                    <Entypo name='dots-three-vertical' size={hp(3)} color='#000' />
                  </View>
                </MenuTrigger>
                <MenuOptions>
                  {props?.route?.params?.isOwner && (
                    <>
                      <MenuOption onSelect={() => props?.route?.params?.deleteCollection(itemData?.id, itemData?.PostTitle)}>
                        <View style={styles.menuItem}>
                          <FontAwesome name="trash" size={20} color="#FF0000" />
                          <Text style={[styles.menuItemText, { color: '#FF0000' }]}>Delete</Text>
                        </View>
                      </MenuOption>
                      <MenuOption onSelect={() => props?.route?.params?.bookmarkArticle(itemData?.id, itemData?.PostTitle, itemData?.PostDescription, itemData?.image)}>
                        <View style={styles.menuItem}>
                          <FontAwesome name={isBookmarked ? "bookmark" : "bookmark-o"} size={20} color="#0147AB" />
                          <Text style={[styles.menuItemText, { color: '#0147AB' }]}>{isBookmarked ? 'UnBookmark' : 'Bookmark'}</Text>
                        </View>
                      </MenuOption>
                    </>
                  )}
                  {!props?.route?.params?.isOwner && (
                    <MenuOption onSelect={() => props?.route?.params?.bookmarkArticle(itemData?.id, itemData?.PostTitle, itemData?.PostDescription, itemData?.image)}>
                      <View style={styles.menuItem}>
                        <FontAwesome name={isBookmarked ? "bookmark" : "bookmark-o"} size={20} color="#0147AB" />
                        <Text style={[styles.menuItemText, { color: '#0147AB' }]}>{isBookmarked ? 'UnBookmark' : 'Bookmark'}</Text>
                      </View>
                    </MenuOption>
                  )}
                </MenuOptions>
              </Menu>
            </View>
          </View>
          <View style={styles.postContainer}>
            <Text style={{ color: '#000' }}>{itemData?.PostDescription}</Text>
          </View>
        </TriggeringView>
      </ImageHeaderScrollView>
    </>
  )
}

export default CardDetail

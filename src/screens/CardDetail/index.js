import React, { useCallback, useState, useEffect } from 'react'
import { Text, View, Image, Platform, ActivityIndicator } from 'react-native'
import styles from '../CardDetail/style'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackButton from '../../components/BackButton/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 300;

const CardDetail = (props) => {
  const itemData = props?.route?.params?.item
  const headerImage = itemData?.image ? { uri: itemData.image } : require('../../assets/img2.png');

  return (
    <>
      {props?.route?.params?.isDeleting && props?.route?.params?.deletingItemId === itemData.id ? <ActivityIndicator color="black" size="large" /> :
        <>
          <ImageHeaderScrollView
            maxHeight={MAX_HEIGHT}
            minHeight={MIN_HEIGHT}
            maxOverlayOpacity={0.6}
            minOverlayOpacity={0.3}
            renderHeader={() => (<Image source={headerImage} style={{ width: '100%', height: MAX_HEIGHT }} />)}
            renderForeground={() => (
              <>
                <BackButton navigation={props?.navigation} children={'Detail Screen'} path={props?.route?.params?.path} />
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
                  {props?.route?.params?.path === 'bookmark' ?
                    <FontAwesome
                      name={"bookmark"}
                      size={hp(3)} color="#0147AB" /> :
                    <>
                      <FontAwesome
                        name={props?.route?.params?.isBookmarked ? "bookmark" : "bookmark-o"}
                        size={hp(3)} color="#0147AB" />
                    </>
                  }
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
                          {props?.route?.params?.path === 'bookmark' ?
                            <MenuOption onSelect={() => props?.route?.params?.bookmarkArticle(itemData?.id, itemData?.PostTitle, itemData?.PostDescription, itemData?.image)}>
                              <View style={styles.menuItem}>
                                <FontAwesome name={"bookmark"} size={20} color="#0147AB" />
                                <Text style={[styles.menuItemText, { color: '#0147AB' }]}>UnBookmark</Text>
                              </View>
                            </MenuOption> :
                            <MenuOption onSelect={() => props?.route?.params?.bookmarkArticle(itemData?.id, itemData?.PostTitle, itemData?.PostDescription, itemData?.image)}>
                              <View style={styles.menuItem}>
                                <FontAwesome name={props?.route?.params?.isBookmarked ? "bookmark" : "bookmark-o"} size={20} color="#0147AB" />
                                <Text style={[styles.menuItemText, { color: '#0147AB' }]}>{props?.route?.params?.isBookmarked ? 'UnBookmark' : 'Bookmark'}</Text>
                              </View>
                            </MenuOption>
                          }
                        </>
                      )}
                      {!props?.route?.params?.isOwner && (
                        <>
                          {props?.route?.params?.path === 'bookmark' ? <MenuOption onSelect={() => props?.route?.params?.bookmarkArticle(itemData?.id, itemData?.PostTitle, itemData?.PostDescription, itemData?.image)}>
                            <View style={styles.menuItem}>
                              <FontAwesome name={ "bookmark" } size={20} color="#0147AB" />
                              <Text style={[styles.menuItemText, { color: '#0147AB' }]}>UnBookmark</Text>
                            </View>
                          </MenuOption> :
                            <MenuOption onSelect={() => props?.route?.params?.bookmarkArticle(itemData?.id, itemData?.PostTitle, itemData?.PostDescription, itemData?.image)}>
                              <View style={styles.menuItem}>
                                <FontAwesome name={ "bookmark" } size={20} color="#0147AB" />
                                <Text style={[styles.menuItemText, { color: '#0147AB' }]}>UnBookmark</Text>
                              </View>
                            </MenuOption>
                          }
                        </>
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
      }
    </>
  )
}

export default CardDetail

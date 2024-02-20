import React, { useState, useEffect } from 'react'
import { Text, View, Image, Platform, ActivityIndicator,Alert } from 'react-native'
import styles from '../CardDetail/style'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackButton from '../../components/BackButton/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Snackbar from 'react-native-snackbar';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from "@react-native-firebase/firestore";
import { useSelector } from 'react-redux';
import storage from '@react-native-firebase/storage';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 300;

const CardDetail = (props) => {
  const itemData = props?.route?.params?.item
  const headerImage = itemData?.image ? { uri: itemData.image } : require('../../assets/img2.png');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [bookmark, setBookmark] = useState(false);
  const user = useSelector((state) => state.user)
  const postId = user?.postId;
 
  useEffect(() => {
    getBookmarkedPosts();
  }, [bookmarkedPosts]);

  const getBookmarkedPosts = async () => {
    const bookmarks = firestore().collection('users');
    const doc = await bookmarks.doc(user?.id).get();
    if (doc.exists) {
      const allData = doc.data();
      setBookmarkedPosts(allData.bookmarks || []);
    }
  }
 
  useEffect(() => {
    const isBookmark= bookmarkedPosts && bookmarkedPosts.some(bookmark => bookmark.id === itemData?.id)
    setBookmark(isBookmark)
  }, [bookmarkedPosts, itemData?.id]);

  //delete collection from firestore
  const deleteCollection = async (collectionId, collectionPostTitle) => {
    try {
      const confirmDelete = await new Promise((resolve, reject) => {
        Alert.alert(
          'Confirm Deletion',
          `Are you sure you want to delete collection '${collectionPostTitle}'?`,
          [
            {
              text: 'No',
              onPress: () => resolve(false),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => resolve(true),
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
      });

      if (!confirmDelete) {
        return;
      }

      setIsDeleting(true);
      setDeletingItemId(collectionId);

      const batch = firestore().batch();

      const docRef = firestore().collection('Posts').doc(postId);
      const bookmarksRef = firestore().collection('users').doc(user?.id);
      const [postsDoc, bookmarksDoc] = await Promise.all([docRef.get(), bookmarksRef.get()]);

      if (postsDoc.exists) {
        const postsArray = postsDoc.data().posts || [];
        const indexToDelete = postsArray.findIndex(item => item.id === collectionId);

        if (indexToDelete >= 0) {
          postsArray.splice(indexToDelete, 1);
          batch.update(docRef, { posts: postsArray });

          if (bookmarksDoc.exists) {
            const bookmarksArray = bookmarksDoc.data().bookmarks || [];
            const bookmarkIndex = bookmarksArray.findIndex(bookmark => bookmark.id === collectionId);
            if (bookmarkIndex !== -1) {
              bookmarksArray.splice(bookmarkIndex, 1);
              batch.update(bookmarksRef, { bookmarks: bookmarksArray });
            }
          }
          await batch.commit();
          deleteFilesInDirectory(collectionPostTitle, () => {
          });

        } else {
          console.error('Item not found for deletion.');
        }
      } else {
        console.error('Document does not exist.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const deleteFilesInDirectory = async (collectionName, onDeleteComplete) => {
    try {
      if (!collectionName) {
        throw new Error('Invalid productsId or collectionName');
      }

      const userStoragePath = `${postId}/`;
      const storagePath = `${userStoragePath}${postId}_${collectionName}`;

      const storageRef = storage().ref(storagePath);

      const items = await storageRef.listAll();
      const deletePromises = items.items.map((item) => item.delete());
      await Promise.all(deletePromises);

      if (onDeleteComplete) {
        onDeleteComplete();
      }
      setIsDeleting(false);
      Snackbar.show({
        text: `${collectionName} is deleted successfully!`,
        textColor: 'white',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    } catch (error) {
      console.error('Error deleting files in directory:', error);
    }
  };
  
  const bookmarkArticle = async (id, postTitle, postDescription, postImage) => {
    try {
      const bookmarkRef = firestore().collection('users').doc(user?.id);
      const bookmarkDoc = await bookmarkRef.get();
      let bookmarks = bookmarkDoc.data()?.bookmarks || [];

      const existingIndex = bookmarks.findIndex((item) => item.id === id);

      if (existingIndex !== -1) {
        bookmarks.splice(existingIndex, 1);
        Snackbar.show({
          text: 'Removed from collection!',
          textColor: 'white',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      } else {
        const newBookmark = {
          id: id,
          PostTitle: postTitle,
          PostDescription: postDescription,
          image: postImage,
        };
        bookmarks.push(newBookmark);
        Snackbar.show({
          text: 'Save to collection!',
          textColor: 'white',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'Green',
        });
      }
      await bookmarkRef.set({ bookmarks: bookmarks }, { merge: true });
    } catch (error) {
      console.error('Error updating bookmarks:', error);
      Alert.alert('Error', `Failed to update bookmarks: ${error.message || 'Unknown error'}. Please try again.`);
    }
  }

  return (
    <>
      {isDeleting && deletingItemId === itemData.id ? <ActivityIndicator color="black" size="large" /> :
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
                      <FontAwesome
                        name={bookmark ? "bookmark" : "bookmark-o"}
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
                          <MenuOption onSelect={() => deleteCollection(itemData?.id, itemData?.PostTitle)}>
                            <View style={styles.menuItem}>
                              <FontAwesome name="trash" size={20} color="#FF0000" />
                              <Text style={[styles.menuItemText, { color: '#FF0000' }]}>Delete</Text>
                            </View>
                          </MenuOption>
                            <MenuOption onSelect={() => bookmarkArticle(itemData?.id, itemData?.PostTitle, itemData?.PostDescription, itemData?.image)}>
                              <View style={styles.menuItem}>
                                <FontAwesome name={bookmark ? "bookmark" : "bookmark-o"} size={20} color="#0147AB" />
                                <Text style={[styles.menuItemText, { color: '#0147AB' }]}>{bookmark ? 'UnBookmark' : 'Bookmark'}</Text>
                              </View>
                            </MenuOption>
                        </>
                      )}
                      {!props?.route?.params?.isOwner && (
                        <>
                             <MenuOption onSelect={() => bookmarkArticle(itemData?.id, itemData?.PostTitle, itemData?.PostDescription, itemData?.image)}>
                             <View style={styles.menuItem}>
                               <FontAwesome name={bookmark ? "bookmark" : "bookmark-o"} size={20} color="#0147AB" />
                               <Text style={[styles.menuItemText, { color: '#0147AB' }]}>{bookmark ? 'UnBookmark' : 'Bookmark'}</Text>
                             </View>
                           </MenuOption>
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

import { View, FlatList, Text,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../BookMark/style';
import CardScreen from '../../components/CardScreen/index'
import firestore from "@react-native-firebase/firestore";
import { useSelector } from 'react-redux';
import { LogBox } from 'react-native';
import Snackbar from 'react-native-snackbar';
import storage from '@react-native-firebase/storage';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const BookMark = (props) => {
  const user = useSelector((state) => state.user)
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
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
    <View style={styles.container}>
      <View style={styles.allDataContainer}>
        {bookmarkedPosts && bookmarkedPosts.length > 0 ?
          <FlatList
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVericalScrollIndicator={false}
            data={bookmarkedPosts}
            numColumns={2}
            renderItem={({ item }) => (<CardScreen item={item} navigation={props?.navigation}
              bookmarkArticle={bookmarkArticle}
              deleteCollection={deleteCollection} 
              deletingItemId={deletingItemId} 
              isDeleting={isDeleting}
              children={'BookMark'}
              path={'bookmark'}
              postId={user?.postId}
              isOwner={item.id.startsWith(user.postId)}
            />)}
            keyExtractor={item => item.id}
          />
          :
          <>
              <Text style={{textAlign: 'center', marginTop: 20, color:'#000'}}>No bookmarked articles found.</Text>
          </>
        }
      </View>
    </View>
  )
}

export default BookMark
import { View, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../BookMark/style';
import CardScreen from '../../components/CardScreen/index'
import firestore from "@react-native-firebase/firestore";
import { useSelector } from 'react-redux';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const BookMark = (props) => {
  const user = useSelector((state) => state.user)
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const { bookmarkArticle, deleteCollection, deletingItemId, isDeleting } = props?.route.params || [];
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
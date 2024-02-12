import { View,ScrollView, FlatList,Text} from 'react-native'
import React,{useEffect,useState} from 'react'
import styles from '../BookMark/style';
import Header from '../../components/Header/index'
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
  
  useEffect(() => {
    getBookmarkedPosts();
  },[bookmarkedPosts]);

  const getBookmarkedPosts = async () => {
    const bookmarks = firestore().collection('users');
    const doc = await bookmarks.doc(user?.id).get();
    if(doc.exists){
      const allData = doc.data();
      setBookmarkedPosts(allData.bookmarks);
    } 
  }
  return (
    <View style = {styles.container}>
       <Header children={'BookMark'} navigation={props?.navigation}/>
       <View style={styles.allDataContainer}>
        {bookmarkedPosts ?
                    <FlatList
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        showsVericalScrollIndicator={false}  
                        data={bookmarkedPosts}
                        numColumns={2}
                        renderItem={({ item }) => (<CardScreen item={item} navigation={props?.navigation} 
                        bookmarkArticle={props?.route?.params?.bookmarkArticle}
                        postId={user?.postId}
                        isOwner={item.id.startsWith(user.postId)}
                        />)}
                        keyExtractor={item => item.id}
                    />
                :
                <Text>No bookmarked articles yet.</Text>
        }
            </View>
    </View>
  )
}

export default BookMark
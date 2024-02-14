import React, { useState, useEffect } from 'react';
import { Text, View, Alert, FlatList, Image, } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';
import styles from '../Home/style'
import Header from '../../components/Header/index';
import LoaderModal from '../../components/LoaderModal/index';
import Swiper from 'react-native-swiper'
import CardScreen from '../../components/CardScreen/index'
import storage from '@react-native-firebase/storage';
import LottieView from 'lottie-react-native';

const Home = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [collections, setCollections] = useState();
  const [allUserCollections, setAllUserCollections] = useState();
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [postID, setPostID]= useState('')
  const [firstTimeLogin, setFirstTimelogin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user)
  const userFirestoreData = firestore().collection('users').doc(user?.id);
  const postId = user?.postId;
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

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

  //use effect for getting all data from firebase
  useEffect(() => {
    checkFirstTimeLogin();
  }, [firstTimeLogin])

  useEffect(() => {
    getAllData();
  }, [collections])

  useEffect(() => {
    getAllUserData();
  }, [allUserCollections])

  const checkFirstTimeLogin = async () => {
    try {
      const userDoc = await userFirestoreData.get();
      const userData = userDoc.data();
      setFirstTimelogin(userData?.firstTimeLogin);
    } catch (error) {
      console.error("Error checking firstTimeLogin:", error);
    }
  };
  useEffect(() => {
    showModal();
  }, [])

  const showModal = () => {
    setModalVisible(true);
  };
  const closeModal = async () => {
    setModalVisible(false);
    await firestore().collection('users').doc(user?.id).update({ firstTimeLogin: false });
    const userDoc = await userFirestoreData.get();
    const userData = userDoc.data();
    setFirstTimelogin(userData?.firstTimeLogin);

  };

  //use effect to prevent multiple calls of save 
  useEffect(() => {
    if (props?.route?.params?.postTitle || props?.route?.params?.postDescription || props?.route?.params?.image) {
      const sessionPostTitle = props?.route?.params?.postTitle;
      const sessionPostDescription = props?.route?.params?.postDescription;
      const sessionPostImage = props?.route?.params?.image;
      savePost(sessionPostTitle, sessionPostDescription, sessionPostImage);
      props.navigation.setParams({ ...props?.route?.params, postTitle: undefined, postDescription: undefined, image: undefined });
    }
  }, [props?.route?.params?.postTitle, props?.route?.params?.postDescription, props?.route?.params?.image]);

  //get all data of specific user from firestore
  const getAllData = async () => {
    try {
      const posts = firestore().collection('Posts');

      const doc = await posts.doc(postId).get();

      if (doc.exists) {
        const allData = doc.data();
        setCollections(allData?.posts);
      } else {
        console.log("no doc");
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  //get data of all user from firestore
  const getAllUserData = async () => {
    try {
      const posts = firestore().collection('Posts');

      const doc = await posts.get();
      let allData = []

      if (doc.empty) {
        console.log('No matching documents.');
        return;
      }

      doc.forEach((doc) => {
        const postData = doc.data().posts.reverse();
        if (postData) {
          allData = [...allData, ...postData]
        }
      })


      setAllUserCollections(allData)
    } catch (err) {
      console.log("err", err);
    }
  }

  // Save Post on Firebase 
  const savePost = async (sessionPostTitle, sessionPostDescription, sessionPostImage) => {
    try {
      setLoading(true)
      const postsRef = firestore().collection("Posts").doc(`${postId}`);
      const doc = await postsRef.get();
      const sessionFolder = `${postId}/${postId}_${sessionPostTitle}`;
      const sessionName = `${sessionPostTitle}`;
      const timestamp = new Date().getTime();
      const imageName = `${sessionFolder}/${sessionName}_${timestamp}.jpg`;
      const reference = storage().ref(imageName);
      await reference.putFile(sessionPostImage);
      const url = await storage().ref(imageName).getDownloadURL();
      let newId;
      if (!doc.exists) {
        newId = 0
        const postData = { id: `${postId}_${newId}`, PostTitle: sessionPostTitle, PostDescription: sessionPostDescription, image: url };
        await postsRef.set({ posts: [postData] });
        const postItemId = `${postId}_${newId}`
        setPostID(postItemId)
      } else {
        const posts = doc.data().posts || [];
        const maxId = posts.reduce((max, post) => Math.max(max, parseInt(post.id.split('_')[1])), -1);
        newId = maxId + 1;
        const postData = { id: `${postId}_${newId}`, PostTitle: sessionPostTitle, PostDescription: sessionPostDescription, image: url };
        await postsRef.update({ posts: firestore.FieldValue.arrayUnion(postData) });
        const postItemId = `${postId}_${newId}`
        setPostID(postItemId)
      }
      setLoading(false)
      Snackbar.show({
        text: `Article is uploaded successfully!`,
        textColor: 'white',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'green',
      });
     
      getAllData();
    } catch (error) {
      console.error('Error saving images:', error);
      Alert.alert('Error', `Failed to save the images: ${error.message || 'Unknown error'}. Please try again.`);
    }
  };

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

      const docRef = firestore().collection('Posts').doc(postId);
      const doc = await docRef.get();

      if (doc.exists) {
        const productsArray = doc.data().posts || [];
        const indexToDelete = productsArray.findIndex(item => item.id === collectionId);

        if (indexToDelete >= 0) {
          productsArray.splice(indexToDelete, 1);
          await docRef.update({ posts: productsArray });
          deleteFilesInDirectory(collectionPostTitle, () => {
            getAllData();
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


  return firstTimeLogin === true ?
    <>
      <LoaderModal modalVisible={modalVisible} closeModal={closeModal} />
    </> :
    <View style={styles.container}>
      <Header children={'Home'} navigation={props?.navigation} bookmarkArticle={bookmarkArticle} />
      <View style={styles.sliderContainer}>
        <Swiper autoplay horizontal={false} activeDotColor='#0147AB'>
          <View style={styles.slide}>
            <Image style={styles.sliderImage} resizeMode='cover' source={require('../../assets/blog.png')} />
          </View>
          <View style={styles.slide}>
            <Image style={styles.sliderImage} resizeMode='cover' source={require('../../assets/blog1.jpg')} />
          </View>
          <View style={styles.slide}>
            <Image style={styles.sliderImage} resizeMode='cover' source={require('../../assets/blog2.jpg')} />
          </View>
        </Swiper>
      </View>
      <Text style={styles.textHeading}>All Articles</Text>
      <View style={styles.allDataContainer}>
        {allUserCollections ?
          <FlatList
            data={allUserCollections}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) =>
              (<CardScreen deleteCollection={deleteCollection} deletingItemId={deletingItemId} isDeleting={isDeleting} item={item} navigation={props?.navigation} bookmarkArticle={bookmarkArticle} isBookmarked={bookmarkedPosts && bookmarkedPosts.some(bookmark => bookmark.id === item?.id)} isOwner={item.id.startsWith(user.postId)} />)
            }
            keyExtractor={item => item?.id}
          />
          : <LottieView style={styles.lottie} source={require('../../assets/A5.json')} autoPlay loop={false} />}
      </View>
      <Text style={styles.textHeading}>Your Articles</Text>
      <View style={styles.allDataContainer}>
        {collections ?
          <FlatList
            data={collections}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) =>
              (<CardScreen isSaving={postID === item.id} loading={loading} deleteCollection={deleteCollection} isDeleting={isDeleting}  deletingItemId={deletingItemId} item={item} navigation={props?.navigation} bookmarkArticle={bookmarkArticle} isBookmarked={bookmarkedPosts && bookmarkedPosts.some(bookmark => bookmark.id === item?.id) } isOwner={item.id.startsWith(user.postId)} />)
            }
            keyExtractor={item => item?.id}
          />
          : <LottieView style={styles.lottie} source={require('../../assets/A5.json')} autoPlay loop={false} />}
      </View>
    </View>
}
export default Home;
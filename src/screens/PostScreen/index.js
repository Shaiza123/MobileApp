import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { View, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, BackHandler} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./style"
import TextInputScreen from '../../components/TextinputScreen/index'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from "react-native-floating-action";
import ImagePicker from 'react-native-image-crop-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function PostScreen(props) {
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [image, setImage] = useState(null);
  const postTitleRef = useRef('');
  const postDescriptionRef = useRef('');

  const takepicture = () => {
    ImagePicker.openCamera({
    }).then(image => {
      setImage(image?.path)
    }).catch((err) => { console.log("catch" + err) })
  }

  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
    }).then(image => {
      setImage(image?.path)
    }).catch((err) => { console.log("catch" + err) })
  }
  const actions = [
    {
      text: "Take Photo",
      icon: <Ionicons name="camera-outline" size={20} color="#FFF" />,
      name: "Take Photo",
      position: 1
    },
    {
      text: "Choose Photo",
      icon: <Ionicons name="images-outline" size={20} color="#FFF" />,
      name: "Choose Photo",
      position: 2
    },
  ];

  const handleSubmit = () => {
    props.navigation.navigate('home', {
      screen: 'Home',
      params: {
          postTitle: postTitle,
          postDescription: postDescription,
          image: image,
      },
    });
    setPostTitle('');
    setPostDescription('')
    setImage(null)
  };

  const cancelImage = () => {
    setImage(null)
  }

  //Use layout effect to set the header options
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => handleBackPress()}>
          <Icon name="arrow-back" size={25} color="#000" style={{ marginLeft: hp(2) }}/>
        </TouchableOpacity>
      ),
    });
  }, [postTitle,postDescription,image, props.navigation])

  //Use effect to handle the back press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      backHandler.remove();
    };
  }, [postTitle,postDescription,image, props.navigation]);

  //Handle back press
  const handleBackPress = () => {
    if (postTitle.length > 0 || postDescription.length > 0 || image !== null) {
      Alert.alert(
        "Save Post",
        "Do you want to save the Post?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Save",
            onPress: () => handleSubmit(),
          },
          {
            text: "Don't Save",
            onPress: () => {
              setPostTitle('');
              setPostDescription('')
              setImage(null)
              props.navigation.navigate('home', {
                screen: 'Home',
                params: { postTitle: props?.route?.params?.postTitle, postDescription: props?.route?.params?.postDescription, image: props?.route?.params?.image },
              });
            },
          },
        ]
      );
      return true;
    }

    if (postTitle.length === 0 || postDescription.length === 0 || image === null) {
      props.navigation.navigate('home', {
        screen: 'Home',
        params: { post: props?.route?.params?.postTitle, postDescription: props?.route?.params?.postDescription, image: props?.route?.params?.image },
      });
      return true;
    }

    return false;
  };


  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false} >
        <View style={styles.container}>
          <View style={{flexDirection:'row'}}>
          </View>
          <TextInputScreen postTitle={postTitle} postDescription={postDescription} postTitleRef={postTitleRef} postDescriptionRef={postDescriptionRef} path={'Post'} setPostTitle={setPostTitle} setPostDescription={setPostDescription} handleSubmit={handleSubmit} image={image}
            cancelImage={cancelImage}
          />
          <FloatingAction
            actions={actions}
            onPressItem={name => {
              { name === 'Take Photo' ? takepicture() : chooseFromLibrary() }
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

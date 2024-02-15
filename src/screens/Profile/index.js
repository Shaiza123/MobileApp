import React, { useState, useRef } from 'react';
import { View, ScrollView, KeyboardAvoidingView, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../Profile/style'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import TextInputScreen from '../../components/TextinputScreen/index'
import Header from '../../components/Header/index'
import { FloatingAction } from "react-native-floating-action";
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const Profile = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState(require('../../assets/userProfile.jpg'));
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user)
  const floatingActionRef = useRef(null)
  const onCameraIconPress = () => {
    if (floatingActionRef.current) {
      floatingActionRef.current.animateButton();
    }
  }

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


  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const countryRef = useRef(null);
  const cityRef = useRef(null);

  const handleSubmit = async (firstName, lastName, phoneNumber, country, city) => {
    try {
      setLoading(true)
      if (!user.id) {
        console.error('User ID is undefined.');
        return;
      }
      if (firstName === undefined || lastName === undefined || phoneNumber === undefined || country === undefined || city === undefined) {
        console.error('Invalid data. Aborting update.');
        return;
      }
      await firestore().collection('users').doc(user.id).update({ firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, country: country, city: city });
      setFirstName('')
      setLastName('')
      setPhoneNumber('')
      setCountry('')
      setCity('')
    }
    catch (err) {
      console.log('adhhjahs', err)
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always" >
        <View style={styles.mainContainer}>
          <Header children={'Edit Profile'} navigation={props?.navigation} />
          <View style={{ justifyContent: 'center', alignItems: 'center', margin: hp(2) }}>
            <View style={{ height: hp(15), width: hp(15), borderRadius: hp(20) }}>
              <ImageBackground source={typeof image === 'string' ? { uri: image }: image} style={styles.drawerImage} imageStyle={{ borderRadius: hp(20) }} >
                <TouchableOpacity style={styles.cameraContainer} onPress={onCameraIconPress}>
                  <FontAwesome name="camera" size={hp(4)} color="#fff" />
                </TouchableOpacity>
              </ImageBackground>
            </View>

          </View>
          <TextInputScreen firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} country={country} setCountry={setCountry} city={city} setCity={setCity}
            handleSubmit={handleSubmit} path={'Edit'}
            firstNameRef={firstNameRef}
            lastNameRef={lastNameRef}
            phoneNumberRef={phoneNumberRef}
            countryRef={countryRef}
            cityRef={cityRef}
            loading={loading} />
            <FloatingAction
              ref={floatingActionRef}
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

export default Profile

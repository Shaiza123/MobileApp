import React, { useState, useRef } from 'react';
import { View, ScrollView, KeyboardAvoidingView, ImageBackground, TouchableOpacity, Text } from 'react-native';
import styles from '../Profile/style'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import TextInputScreen from '../../components/TextinputScreen/index'
import ImagePicker from 'react-native-image-crop-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import storage from '@react-native-firebase/storage';

const Profile = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState(require('../../assets/userProfile.jpg'));
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user)
  const postId = user?.postId;

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

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const countryRef = useRef(null);
  const cityRef = useRef(null);

  const handleSubmit = async (firstName, lastName, phoneNumber, country, city,image) => {
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
      const sessionFolder = `${postId}`;
      const userId = 'userId'
      const imageName = `${sessionFolder}/${sessionFolder}_${userId}.jpg`;
      const reference = storage().ref(imageName);
      await reference.putFile(image);
      const url = await storage().ref(imageName).getDownloadURL();
      await firestore().collection('users').doc(user.id).update({ firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, country: country, city: city, url: url });
      setFirstName('')
      setLastName('')
      setPhoneNumber('')
      setCountry('')
      setCity('')
      setImage(require('../../assets/userProfile.jpg'))
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
          <View style={{ alignItems: 'center', justifyContent: 'center',flexDirection:'row' }}>
            <ImageBackground source={typeof image === 'string' ? { uri: image } : image} style={styles.drawerImage} imageStyle={{ borderRadius: hp(20) }} />
            <Menu>
              <MenuTrigger>
                  <FontAwesome name="edit" size={hp(3.5)} color="#0147AB" style={{marginTop:hp(12)}}/>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => takepicture()}>
                  <View style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Take Photo</Text>
                  </View>
                </MenuOption>
                <MenuOption onSelect={() => chooseFromLibrary()}>
                  <View style={styles.menuItem}>
                    <Text style={styles.menuItemText}>choose From Library</Text>
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <TextInputScreen firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} country={country} setCountry={setCountry} city={city} setCity={setCity}
            handleSubmit={handleSubmit} path={'Edit'}
            firstNameRef={firstNameRef}
            lastNameRef={lastNameRef}
            phoneNumberRef={phoneNumberRef}
            countryRef={countryRef}
            cityRef={cityRef}
            loading={loading}
            image={image}
             />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

}

export default Profile

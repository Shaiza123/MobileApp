import React, { useState, useRef } from 'react';
import auth from '@react-native-firebase/auth';
import { Text, View, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux'
import { signout } from '../../redux/Reducer'
import styles from '../Profile/style'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import TextInputScreen from '../../components/TextinputScreen/index'
import { Button } from 'react-native-paper';

const Profile = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [delAccountloading, setDelAccountLoading] = useState(false)
  const [logoutloading, setLogoutLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState('');
  const user = useSelector((state) => state.user)

  const ageRef = useRef(null);
  const genderRef = useRef(null);

  const deleteAccount = async () => {
    try {
      setDelAccountLoading(true)
      const confirmDelete = await new Promise((resolve, reject) => {
        Alert.alert(
          'Confirm Deletion',
          `Are you sure you want to delete collection '${user?.email}'?`,
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
      const userDocRef = firestore().collection('users').doc(user.id);
      await userDocRef.delete();
      await auth().currentUser.delete();
      dispatch(signout());
      console.log('User account deleted!');
    } catch (error) {
      console.error("Error during account deletion:", error);
    }
    finally {
      setDelAccountLoading(false)
    }
  };

  const dispatch = useDispatch()
  const logout = async () => {
    try {
      setLogoutLoading(true)
      await auth().signOut();
      dispatch(signout());
    } catch (error) {
      console.error("Error during logout:", error);
    }
    finally {
      setLogoutLoading(false)
    }
  }
  const handleSubmit = async (age, gender) => {
    try {
      setLoading(true)
      if (!user.id) {
        console.error('User ID is undefined.');
        return;
      }
      if (age === undefined || gender === undefined) {
        console.error('Invalid data. Aborting update.');
        return;
      }
      await firestore().collection('users').doc(user.id).update({ age: age, gender: gender });
      setAge('')
      setGender('')
    }
    catch (err) {
      console.log('adhhjahs', err)
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TextInputScreen setAge={setAge} age={age} gender={gender} setGender={setGender} handleSubmit={handleSubmit} path={'Edit'} ageRef={ageRef} genderRef={genderRef} loading={loading} />
      <View style={styles.buttonContainer}>
      {delAccountloading ? <ActivityIndicator size="small" color="#0000ff" /> :
        <Button style={styles.button} mode='contained' buttonColor={'red'} onPress={() => deleteAccount()}
        >
          <Text style={styles.buttonText}>Delete My Account</Text>
        </Button>
      }
      {logoutloading ? <ActivityIndicator size="small" color="#0000ff" /> :
        <Button style={styles.button} mode='contained' buttonColor={'#f48fb0'} onPress={() => logout()}
        >
          <Text style={styles.buttonText}>Logout</Text> 
        </Button>
      }
      </View>
    </View>
  );

}

export default Profile

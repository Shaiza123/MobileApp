import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../../components/Header/style';
import BackButton from '../BackButton/index';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Header = (props) => {
  return (
    <View>
      {props?.children === 'Sign Up' ? <Text style={styles.heading}>Create an account</Text> :
        <>
          {props?.children === 'Forgot Password' ?
            <Text style={styles.heading}>Forgot Password</Text>
            :
            <>
              {props?.children === 'Email Verify' ?
                <Text style={styles.heading}>Email Verify</Text> :
                <>
                  {props?.children === 'Hello there' ?
                    <Text style={styles.heading}>Hello there</Text>
                    :
                    <>
                      {props?.children === 'Post' ?
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <BackButton navigation={props?.navigation} />
                          <Text style={[styles.headingText, { marginLeft: hp(3) }]}>Post</Text>
                        </View>
                        :
                        <>
                          {props?.children === 'Detail Screen' ?
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <BackButton navigation={props?.navigation} />
                            </View>
                            :
                            <>
                              {props?.children === 'BookMark' ?
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <BackButton navigation={props?.navigation} />
                                  <Text style={[styles.headingText, { marginLeft: hp(3) }]}>BookMark Articles</Text>
                                </View>
                                :
                                <>
                                  {props?.children === 'Edit Profile' ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                      <BackButton navigation={props?.navigation} />
                                      <Text style={[styles.headingText, { marginLeft: hp(3) }]}>Edit Profile</Text>
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                      <Image source={require('../../assets/logo.png')} style={styles.image} />
                                      <Text style={styles.headingText}>Home</Text>
                                      <TouchableOpacity style={{ alignItems: 'flex-end', flex: 1 }} onPress={() => props?.navigation?.navigate('BookMark', { bookmarkArticle: props?.bookmarkArticle })}>
                                        <FontAwesome name="bookmark-o" size={hp(3)} color="#0147AB" />
                                      </TouchableOpacity>
                                    </View>
                                  }
                                </>
                              }
                            </>
                          }
                        </>
                      }
                    </>
                  }
                </>
              }
            </>
          }
        </>
      }
    </View>
  )
}

export default Header
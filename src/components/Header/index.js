import { View, Text } from 'react-native'
import React from 'react'
import styles from '../../components/Header/style';

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
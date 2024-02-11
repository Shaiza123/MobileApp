import React, { useRef } from 'react'
import { Text, View, Image, Platform, StatusBar } from 'react-native'
import styles from '../CardDetail/style'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackButton from '../../components/BackButton/index';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 300;

const CardDetail = (props) => {
  const itemData = props?.route?.params?.item
  const headerImage = itemData?.image ? { uri: itemData.image } : require('../../assets/img2.png');
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (<Image source={headerImage} style={{ width: '100%', height: MAX_HEIGHT }} />)}
        renderForeground={() => (
          <>
            <BackButton navigation={props?.navigation} children={'Detail Screen'}/>
            <View style={styles.titleContainer}>
              <Text style={styles.postTitleText}>
                {itemData?.PostTitle}
              </Text>
            </View>
          </>
        )}
      >
        <TriggeringView style={{ marginHorizontal: hp(1) }}
        >
          <View style={styles.postContainer}>
            <Text style={styles.heading}>OverView</Text>
          </View>
          <View style={styles.postContainer}>
            <Text style={{ color: '#000' }}>{itemData?.PostDescription}</Text>
          </View>
        </TriggeringView>
      </ImageHeaderScrollView>
    </>
  )
}

export default CardDetail
